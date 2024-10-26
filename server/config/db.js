const mongoose = require("mongoose");
require("dotenv").config();

const db_url = process.env.DATABASE_URL;
const connectDB = async () => {
  try {
    await mongoose.connect(db_url);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed", error);
  }
};

module.exports = connectDB;
