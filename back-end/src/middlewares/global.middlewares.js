import mongoose from "mongoose";
import { findByUsernameService } from "../services/user.service.js";
import client from "../helpers/redis.js";

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
      return res.status(404).send({ message: "User not found" });
    }

    req.username = username;
    req.user = user;

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const cache = async (req, res, next) => {
  try {
    const username = req.params.username;
  
    client.get(username, (err, data) => {
      if (err) throw err;
    
      if (data !== null) {
        console.log("Data is already cached");
        res.send(JSON.parse(data));
        return;
      } 
    
      console.log("Data is not cached");
      next();
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
