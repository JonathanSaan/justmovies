import redis from "redis";
import mongoose from "mongoose";
import { findByUsernameService } from "../services/user.service.js";

const client = redis.createClient(6379);

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
  const username = req.params.username;
  
  client.get(username, (err, data) => {
    if (err) {
      console.error("Error fetching from cache:", err);
      res.status(500).send({ message: err.message });
      return;
    }
    
    if (data !== null) {
      console.log("Data is already cached");
      res.send(JSON.parse(data));
      return;
    } 
    
    console.log("Data is not cached");
    next();
  });
};