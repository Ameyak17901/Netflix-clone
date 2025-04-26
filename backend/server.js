import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";

import { connectDB } from "./config/db.js";
import { protectedRoute } from "./middleware/protectedRoute.js";
import { envVars } from "./config/envVars.js";

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectedRoute, movieRoutes);
app.use("/api/v1/tv", protectedRoute, tvRoutes);
app.use("/api/v1/search", protectedRoute, searchRoutes);
console.log(path.join(__dirname, "/frontend/dist"));

if (envVars.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*name", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(envVars.PORT, async () => {
  console.log("server started at http://localhost:" + envVars.PORT);
  await connectDB();
});
