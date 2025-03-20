const db = require('../config/connection');
const { User, Thought, Mentorship } = require('../models');
const userSeeds = require('./userSeeds.json');
const thoughtSeeds = require('./thoughtSeeds.json');
const mentorshipSeeds = require('./mentorshipSeeds.json'); // Import mentorship seeds
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    console.log('🧹 Cleaning previous database records...');
    
    // Clean previous data
    await cleanDB('Thought', 'thoughts');
    await cleanDB('User', 'users');
    await cleanDB('Mentorship', 'mentorships'); // Clean mentorship collection

    console.log('✅ Previous data cleared.');

    // Seed Users and store their ObjectIds
    console.log('👤 Seeding users...');
    const users = await User.create(userSeeds);
    console.log('✅ Users Seeded:', users.map(user => user.username));

    // Create a mapping of usernames to their MongoDB ObjectIds
    const userMap = {};
    users.forEach(user => {
      userMap[user.username] = user._id;
    });

    // Seed Thoughts and associate them with Users (No changes here)
    console.log('💭 Seeding thoughts...');
    for (let i = 0; i < thoughtSeeds.length; i++) {
      const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
      await User.findOneAndUpdate(
        { username: thoughtAuthor },
        { $addToSet: { thoughts: _id } }
      );
    }
    console.log('✅ Thoughts Seeded.');

    // Seed Mentorships with Valid User ObjectIds
    console.log('🎓 Seeding mentorships...');
    const mentorshipsWithUsers = mentorshipSeeds.map(mentorship => {
      if (!userMap[mentorship.username]) {
        console.error(`❌ Error: User "${mentorship.username}" not found in database. Skipping this mentorship.`);
        return null;
      }
      return {
        ...mentorship,
        user: userMap[mentorship.username] // Assign correct ObjectId
      };
    });

    // Filter out any mentorships without a valid user
    const validMentorships = mentorshipsWithUsers.filter(m => m !== null);

    if (validMentorships.length > 0) {
      await Mentorship.insertMany(validMentorships);
      console.log('✅ Mentorships Seeded.');
    } else {
      console.log('⚠️ No valid mentorships to seed.');
    }

    console.log('🌱 Database seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding Error:', err);
    process.exit(1);
  }
});
