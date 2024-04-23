import axios from "axios";

const moviesMiddleware = (req, res, next) => {
  try {
    const response = axios.get(`https://api.themoviedb.org/3/movie/${req.params.movieId}?api_key=${process.env.API_TMDB}&language=en-US"`);

    if (!response) {
      res.status(400).send({ message: "This movie does not exist in our catalog." });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default moviesMiddleware;
