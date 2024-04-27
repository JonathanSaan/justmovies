import bcrypt from "bcrypt";
import User from "../models/User.js";
import client from "../helpers/redis.js";

export const findByUsernameService = async (username) => {
  const usernameFromCache = await client.get(username);
  
  if (usernameFromCache) {
    return JSON.parse(usernameFromCache);
  }

  const user = await User.findOne({ username });

  if (!user) return null;

  const userDetails = {
    user: {
      id: user._id,
      username: user.username,
      description: user.description,
      avatar: user.avatar,
      favorites: user.favorites,
      __v: user.__v,
    },
  };
  
  client.setEx(username, 3600, JSON.stringify(userDetails));
  
  return userDetails;
};

export const findByIdService = (id) => User.findById(id).select("+password");

export const comparePasswords = async (password, hash) => bcrypt.compare(password, hash);

export const updateAvatarService = async (id, username, avatar) => {
  client.del(username);
  
  return User.findOneAndUpdate(
    { _id: id },
    { avatar },
    { rawResult: true } 
  );
};

let image = "data:image/png;base64,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";

export const deleteAvatarService = async (id, username) => {
  client.del(username);
  
  return User.findOneAndUpdate(
    { _id: id },
    { avatar: image },
    { new: true }
  );
};

export const updateDescriptionService = async (id, username, description) => {
  client.del(username);
  
  return User.findOneAndUpdate(
    { _id: id }, 
    { description }, 
    { new: true }
  );
};

export const updatePasswordService = async (
  id,
  username,
  newPassword,
  repeatPassword
) => {
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  const hashedRepeatPassword = await bcrypt.hash(repeatPassword, 10);
  
  client.del(username);
  
  return User.findOneAndUpdate(
    { _id: id },
    { password: hashedNewPassword, repeatPassword: hashedRepeatPassword },
    { new: true }
  );
};

export const eraseService = (id, username) => {
  client.del(username);
  
  return User.findByIdAndDelete({ _id: id });
};
