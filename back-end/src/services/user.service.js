import bcrypt from "bcrypt";
import User from "../models/User.js";

export const findByUsernameService = (username) => User.findOne({ username });

export const findByIdService = (id) => User.findById(id).select("+password");

export const comparePasswords = async (password, hash) => bcrypt.compare(password, hash);

export const updateDescriptionService = async (id, description) =>
  User.findOneAndUpdate({ _id: id }, { description }, { new: true });

export const updatePasswordService = async (
  id,
  newPassword,
  repeatPassword
) => {
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  const hashedRepeatPassword = await bcrypt.hash(repeatPassword, 10);

  return User.findOneAndUpdate(
    { _id: id },
    { password: hashedNewPassword, repeatPassword: hashedRepeatPassword },
    { new: true }
  );
};

export const eraseService = (id) => User.findByIdAndDelete({ _id: id });
