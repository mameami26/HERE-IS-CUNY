const db = require('../config/connection');
const { User, Thought, Mentorship } = require('../models');
const userSeeds = require('./userSeeds.json');
const thoughtSeeds = require('./thoughtSeeds.json');
const mentorshipSeeds = require('./mentorshipSeeds.json'); // Import mentorship seeds
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    // Clean previous data
    await cleanDB('Thought', 'thoughts');
    await cleanDB('User', 'users');
    await cleanDB('Mentorship', 'mentorships'); // Clean mentorship collection

    // Create users
    const users = await User.create(userSeeds);

    // Create thoughts and associate with users
    for (let i = 0; i < thoughtSeeds.length; i++) {
      const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
      await User.findOneAndUpdate(
        { username: thoughtAuthor },
        {
          $addToSet: { thoughts: _id },
        }
      );
    }

    // Create mentorships and associate with users
    for (let i = 0; i < mentorshipSeeds.length; i++) {
      const mentorship = mentorshipSeeds[i];
      const user = await User.findById(mentorship.user);
      if (user) {
        mentorship.user = user._id; // Ensure user association
        await Mentorship.create(mentorship);
      } else {
        console.error(`User with ID ${mentorship.user} not found`);
      }
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
