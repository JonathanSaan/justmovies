import { Router } from "express";

import { addFavoriteMovies, removeFavoriteMovies } from "../controllers/movies.controller.js";
import authMiddleware from "../middlewares/auth.middlewares.js";
import moviesMiddleware from "../middlewares/movies.middlewares.js";

const router = Router();

router.post("/addFavorite/:movieId", moviesMiddleware, authMiddleware, addFavoriteMovies);
router.delete("/removeFavorite/:movieId", moviesMiddleware, authMiddleware, removeFavoriteMovies);

export default router;
