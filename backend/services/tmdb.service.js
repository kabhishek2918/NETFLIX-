
import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

export const fetchFromTMDB = async (url) => {
  const options = {
    params: {
      api_key: ENV_VARS.TMDB_API_KEY,
    },
    headers: {
      accept: "application/json",
    },
  };

  const response = await axios.get(url, options);

  return response.data;
};

// This is a simple service that we will use to fetch data from the TMDB API.
// Compare this snippet from backend/services/tmdb.service.js:  // import axios from "axios";
// // import { ENV_VARS } from "../config/envVars.js";
