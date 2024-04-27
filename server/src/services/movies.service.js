import User from "../models/User.js";
import client from "../helpers/redis.js";

export const addFavoriteService = async (movieId, userId, username, movieTitle, movieImage) => {
  const user = await User.findOne({ _id: userId });
  
  const isAlreadyFavorited = user.favorites.some((favorite) => favorite.movieId === movieId);

  if (isAlreadyFavorited) {
    throw new Error("Movie already added to favorites");
  }
  
  client.del(username);
  
  return User.findOneAndUpdate(
    { _id: userId },
    { $push: { favorites: { movieId, movieTitle, movieImage } } },
    { new: true }
  );
};

export const deleteFavoriteService = async (movieId, userId, username, movieTitle, movieImage) => {
  client.del(username);
  
  return User.findOneAndUpdate(
    { _id: userId },
    { $pull: { favorites: { movieId, movieTitle, movieImage } } },
    { new: true }
  );
};
