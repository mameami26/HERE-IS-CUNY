const db = require('./connection');
const { User, Mentorship, Job, Event, Course } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    // Clean existing data
    await cleanDB('User', 'users');
    await cleanDB('Mentorship', 'mentorships');
    await cleanDB('Job', 'jobs');
    await cleanDB('Event', 'events');
    await cleanDB('Course', 'courses');

    // Seed Users
    const users = await User.insertMany([
      {
        firstName: 'Pamela',
        lastName: 'Washington',
        email: 'pamela@testmail.com',
        password: 'password12345',
        role: 'INSTRUCTOR',
        skills: ['JavaScript', 'React'],
        bio: 'An experienced software developer.',
      },
      {
        firstName: 'Elijah',
        lastName: 'Holt',
        email: 'eholt@testmail.com',
        password: 'password12345',
        role: 'STUDENT',
        skills: ['Node.js', 'GraphQL'],
        bio: 'Passionate about backend development.',
      },
    ]);

    console.log('✅ Users seeded successfully');

    // Seed Mentorships
    await Mentorship.insertMany([
      {
        user: users[0]._id, // Pamela
        expertise: ['JavaScript', 'React'],
        industry: 'Software Development',
        yearsOfExperience: 5,
        availableTimeSlots: ['Monday 10am-12pm', 'Wednesday 2pm-4pm'],
      },
      {
        user: users[1]._id, // Elijah
        expertise: ['Node.js', 'GraphQL'],
        industry: 'Web Development',
        yearsOfExperience: 2,
        availableTimeSlots: ['Tuesday 1pm-3pm', 'Thursday 11am-1pm'],
      },
    ]);

    console.log('✅ Mentorships seeded successfully');

    // Seed Courses
    await Course.insertMany([
      {
        title: 'Introduction to React',
        description: 'Learn the basics of React.js, a powerful front-end library.',
        author: users[0]._id, // Pamela
      },
      {
        title: 'Advanced Node.js and GraphQL',
        description: 'Dive deeper into Node.js and explore building APIs with GraphQL.',
        author: users[1]._id, // Elijah
      },
    ]);

    console.log('✅ Courses seeded successfully');

    // Seed Jobs
    await Job.insertMany([
      {
        company: 'Tech Corp',
        position: 'Frontend Developer',
        description: 'Looking for a skilled frontend developer.',
        applicationLink: 'https://techcorp.com/apply',
        postedDate: new Date('2024-09-01'),
        isWomenFriendly: true,
        supportsDiversity: true,
        applicants: [],
      },
      {
        company: 'Innovatech',
        position: 'Backend Developer',
        description: 'Seeking an experienced backend developer.',
        applicationLink: 'https://innovatech.com/apply',
        postedDate: new Date('2024-09-15'),
        isWomenFriendly: false,
        supportsDiversity: true,
        applicants: [],
      },
    ]);

    console.log('✅ Jobs seeded successfully');

    // Seed Events (Static Data)
    await Event.insertMany([
      {
        title: 'React Basics Workshop',
        description: 'An introductory workshop on React.js for beginners.',
        date: new Date('2024-10-15T10:00:00Z'),
        registrationLink: 'https://example.com/react-workshop',
        tags: ['React', 'Workshop', 'Frontend'],
        enrollments: 0,
      },
      {
        title: 'Node.js API Development',
        description: 'Learn to build RESTful APIs using Node.js and Express.',
        date: new Date('2024-11-01T13:00:00Z'),
        registrationLink: 'https://example.com/nodejs-workshop',
        tags: ['Node.js', 'Backend', 'API'],
        enrollments: 0,
      },
      {
        title: 'GraphQL and Apollo Server',
        description: 'Explore building GraphQL APIs with Apollo Server.',
        date: new Date('2024-11-20T15:00:00Z'),
        registrationLink: 'https://example.com/graphql-workshop',
        tags: ['GraphQL', 'Backend', 'API'],
        enrollments: 0,
      },
    ]);

    console.log('✅ Events seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
  } finally {
    process.exit();
  }
});
