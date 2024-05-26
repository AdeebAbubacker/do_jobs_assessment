

const mongoose = require('mongoose');


const connectDB = async () => {
  const localConnectionString = "mongodb://127.0.0.1:27017/DoJobs";

  try {
    await mongoose.connect(localConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

module.exports = connectDB;
