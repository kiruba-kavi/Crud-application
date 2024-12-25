const mongoose = require('./src/mongoose/connection');
const Note = require('./src/mongoose/models/note');

const seedData = [
  { title: "Grocery List", content: "Buy milk, bread, and eggs." },
  { title: "Workout Plan", content: "30 minutes of cardio, 15 minutes of stretching." },
  { title: "Meeting Notes", content: "Discuss project milestones and deadlines." },
];

const seedDatabase = async () => {
  try {
    await Note.insertMany(seedData);
    console.log('Data seeded successfully');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding data:', error.message);
    mongoose.disconnect();
  }
};

seedDatabase();
