import dotenv from "dotenv";

dotenv.config();

export const envVars = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  DB_PASSWORD: process.env.DB_PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  TMDB_API_KEY: process.env.TMDB_API_KEY,
  TMDB_API_ACCESS_TOKEN: process.env.TMDB_API_ACCESS_TOKEN,
};
