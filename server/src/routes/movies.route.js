import { Router } from "express";

import { addFavoriteMovies, removeFavoriteMovies } from "../controllers/movies.controller.js";
import authMiddleware from "../middlewares/auth.middlewares.js";

const router = Router();

router.post("/addFavorite/:movieId", authMiddleware, addFavoriteMovies);
router.delete("/removeFavorite/:movieId", authMiddleware, removeFavoriteMovies);

export default router;
