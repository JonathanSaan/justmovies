import { addFavoriteService, deleteFavoriteService } from "../services/movies.service.js";

export const addFavoriteMovies = async (req, res) => {
  try {
    const { userFrom, movieId, movieTitle, movieImage } = req.body;

    const movie = await addFavoriteService(userFrom, movieId, movieTitle, movieImage);

    res.send({ message: "Movie added to favorites", movie });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const removeFavoriteMovies = async (req, res) => {
  try {
    const { userFrom, movieId, movieTitle, movieImage } = req.body;

    await deleteFavoriteService(userFrom, movieId, movieTitle, movieImage);

    res.send({ message: "Movie removed from favorites" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
