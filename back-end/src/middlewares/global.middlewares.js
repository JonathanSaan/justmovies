import mongoose from "mongoose";
import { findByUsernameService } from "../services/user.service.js";

export const validId = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid ID" });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const validUser = async (req, res, next) => {
  try {
    const username = req.params.username;
    const user = await findByUsernameService(username);

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    req.username = username;
    req.user = user;

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
