import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

export const fetchFromTMDB = async (url) => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + ENV_VARS.TMDB_API_KEY,
    },
  };

  const response = await axios.get(url, options);

  if (response.status !== 200) {
    throw new Error("Failed to fetch data from TMDB" + response.statusText);
  }

  return response.data;
};
// This is a simple service that we will use to fetch data from the TMDB API.
// Compare this snippet from backend/services/tmdb.service.js:  // import axios from "axios";
// // import { ENV_VARS } from "../config/envVars.js";
