const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.log('No MONGODB_URI set nhi ho rha hai - running without database.');
      return;
    }

    try {
      const conn = await mongoose.connect(uri);
      console.log(`MongoDB connected:`);
    } catch (err) {
      console.error('MongoDB connection error:', err.message);
      process.exit(1);
    }
  };
  module.exports = connectDB;
