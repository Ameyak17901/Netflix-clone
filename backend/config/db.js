import mongoose from "mongoose";
import { envVars } from "../config/envVars.js";

export async function connectDB() {
  try {
    const conn = await mongoose.connect(envVars.MONGO_URI);
    console.log(`Connected to database: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to database" + error.message);
    process.exit(1);
  }
}
