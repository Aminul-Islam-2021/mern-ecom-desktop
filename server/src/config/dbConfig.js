// import files & packages
// This file is responsible for connecting to the MongoDB database using Mongoose.
// It imports the Mongoose library and dotenv for environment variable management.

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
