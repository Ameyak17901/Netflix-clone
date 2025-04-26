import express from "express";
import {
  getTrendingTvShow,
  getTrailers,
  getTvShowDetails,
  getTvShowsByCategory,
  getSimilarTvShows,
} from "../controllers/tv.controller.js";

const router = express.Router();

router.get("/trending", getTrendingTvShow);
router.get("/:id/trailers", getTrailers);
router.get("/:id/details", getTvShowDetails);
router.get("/:id/similar", getSimilarTvShows);
router.get("/:category", getTvShowsByCategory);

export default router;
