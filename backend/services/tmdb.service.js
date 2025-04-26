import axios from "axios";
import { envVars } from "../config/envVars.js";

export async function fetchFromTMDB(url) {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${envVars.TMDB_API_ACCESS_TOKEN}`,
      },
    };
    const response = await axios.get(url, options);
    if (response.status !== 200) {
      throw new Error("Error Fetching Data from TMDB");
    }
    return response.data;
  
}
