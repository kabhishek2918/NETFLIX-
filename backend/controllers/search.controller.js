import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

// ✅ New function to get search suggestions
export async function searchSuggestions(req, res) {
  const { query } = req.params; // Get search query

  if (!query) {
    return res
      .status(400)
      .json({ success: false, message: "Query is required" });
  }

  try {
    // Search for movies, TV shows, and people in one request
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (!response.results || response.results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No suggestions found" });
    }

    // Extract relevant suggestion data (limit results for better performance)
    const suggestions = response.results.slice(0, 5).map((item) => ({
      id: item.id,
      title: item.title || item.name, // Title for movies/TV, name for people
      image: item.poster_path || item.profile_path, // Profile image for people, poster for movies/TV
      type: item.media_type, // "movie", "tv", or "person"
    }));

    res.status(200).json({ success: true, content: suggestions });
  } catch (error) {
    console.log("Error in searchSuggestions controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// ✅ Fix incorrect template literals in existing search functions
export async function searchPerson(req, res) {
  const { query } = req.params;
  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.results[0].name,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error in searchPerson controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function searchMovie(req, res) {
  const { query } = req.params;

  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].title,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });
    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error in searchMovie controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function searchTv(req, res) {
  const { query } = req.params;

  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].name,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });
    res.json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error in searchTv controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getSearchHistory(req, res) {
  try {
    res.status(200).json({ success: true, content: req.user.searchHistory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function removeItemFromSearchHistory(req, res) {
  let { id } = req.params;

  id = parseInt(id);

  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id: id },
      },
    });

    res
      .status(200)
      .json({ success: true, message: "Item removed from search history" });
  } catch (error) {
    console.log(
      "Error in removeItemFromSearchHistory controller:",
      error.message
    );
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
