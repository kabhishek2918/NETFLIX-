import { useState, useEffect } from "react";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const { setContentType } = useContentStore();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setContentType(tab);
    setResults([]);
    setSuggestions([]);
  };

  // Fetch suggestions dynamically
  useEffect(() => {
    if (!searchTerm) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await axios.get(`/api/v1/search/suggestions/${searchTerm}`);
        setSuggestions(res.data.content);
      } catch {
        setSuggestions([]);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSuggestions([]);

    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
      setResults(res.data.content);
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error(
          "Nothing found, make sure you are searching under the right category"
        );
      } else {
        toast.error("An error occurred, please try again later");
      }
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-4">
          {["movie", "tv", "person"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 rounded ${
                activeTab === tab ? "bg-red-600" : "bg-gray-800"
              } hover:bg-red-700`}
              onClick={() => handleTabClick(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Search Input + Suggestions */}
        <form
          className="relative flex gap-2 items-stretch mb-8 max-w-2xl mx-auto"
          onSubmit={handleSearch}
        >
          <div className="w-full relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={"Search for a " + activeTab}
              className="w-full p-2 rounded bg-gray-800 text-white"
            />

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <ul className="absolute w-full bg-gray-900 text-white mt-1 rounded shadow-lg max-h-64 overflow-auto z-50">
                {suggestions.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-3 p-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setSearchTerm(item.title || item.name);
                      setSuggestions([]);
                    }}
                  >
                    <img
                      src={
                        item.image
                          ? `${ORIGINAL_IMG_BASE_URL}${item.image}`
                          : "/placeholder.jpg"
                      }
                      alt={item.title || item.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <span>
                      {item.title || item.name} ({item.type})
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
            <Search className="size-6" />
          </button>
        </form>

        {/* Search Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((result) => {
            if (!result.poster_path && !result.profile_path) return null;

            return (
              <div key={result.id} className="bg-gray-800 p-4 rounded">
                {activeTab === "person" ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={ORIGINAL_IMG_BASE_URL + result.profile_path}
                      alt={result.name}
                      className="max-h-96 rounded mx-auto"
                    />
                    <h2 className="mt-2 text-xl font-bold">{result.name}</h2>
                  </div>
                ) : (
                  <Link
                    to={`/watch/${result.id}`}
                    onClick={() => setContentType(activeTab)}
                  >
                    <img
                      src={ORIGINAL_IMG_BASE_URL + result.poster_path}
                      alt={result.title || result.name}
                      className="w-full h-auto rounded"
                    />
                    <h2 className="mt-2 text-xl font-bold">
                      {result.title || result.name}
                    </h2>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
