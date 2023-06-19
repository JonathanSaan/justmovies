import User from "../models/User.js";

export const addFavoriteService = async (userFrom, movieId, movieTitle, movieImage) => {
  const user = await User.findOne({ _id: userFrom });
  
  const isAlreadyFavorited = user.favorites.some((favorite) => favorite.movieId === movieId);

  if (isAlreadyFavorited) {
    throw new Error("Movie already added to favorites");
  }

  return User.findOneAndUpdate(
    { _id: userFrom },
    { $push: { favorites: { movieId, movieTitle, movieImage } } },
    { new: true }
  );
};

export const deleteFavoriteService = async (userFrom, movieId, movieTitle, movieImage) =>
  User.findOneAndUpdate(
    { _id: userFrom },
    { $pull: { favorites: { movieId, movieTitle, movieImage } } },
    { new: true }
  );
