import express from "express";
import {
  getSearchHistory,
  removeItemFromSearchHistory,
  searchMovie,
  searchPerson,
  searchTv,
  searchSuggestions,
} from "../controllers/search.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/person/:query", protectRoute, searchPerson);
router.get("/movie/:query", protectRoute, searchMovie);
router.get("/tv/:query", protectRoute, searchTv);

router.get("/history", protectRoute, getSearchHistory);

router.delete("/history/:id", protectRoute, removeItemFromSearchHistory);

router.get("/suggestions/:query", protectRoute, searchSuggestions);

export default router;
