const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn}`);
  } catch (error) {
    console.log(error)
  }
};

module.exports = connectDB;