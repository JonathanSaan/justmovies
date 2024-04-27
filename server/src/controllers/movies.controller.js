import { addFavoriteService, deleteFavoriteService } from "../services/movies.service.js";

export const addFavoriteMovies = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { userId, username, movieTitle, movieImage } = req.body;

    await addFavoriteService(movieId, userId, username, movieTitle, movieImage);

    res.send({ message: "Movie added to favorites" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const removeFavoriteMovies = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { userId, username, movieTitle, movieImage } = req.body;

    await deleteFavoriteService(movieId, userId, username, movieTitle, movieImage);

    res.send({ message: "Movie removed from favorites" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
