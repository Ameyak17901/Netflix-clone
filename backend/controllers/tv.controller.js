import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingTvShow(req, res) {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    const randomTvShow =
      data.results[Math.floor(Math.random() * data.results?.length)];

    return res.status(200).json({ success: true, content: randomTvShow });
  } catch (error) {
    console.log("Error fetching trending Tv Show: " + error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function getTrailers(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    return res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      res.status(404).send(null);
    }
    console.log("Error fetching trailer", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function getTvShowDetails(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );
    res.status(200).json({ success: true, content: data });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    console.error("Error fetching tv show details: ", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function getSimilarTvShows(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );
    return res.status(200).json({ sucess: true, content: data.results });
  } catch (error) {
    console.error("Error fetching similar tv shows" + error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function getTvShowsByCategory(req, res) {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
    return res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.error("Error fetching tv shows by category: " + error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
