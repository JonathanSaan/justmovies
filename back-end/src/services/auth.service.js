import jvt from "jsonwebtoken";
import User from "../models/User.js";

export const loginService = (email) =>
  User.findOne({ email: email }).select("+password");

export const createService = (body) => User.create(body);

export const generateToken = (id, hr) =>
  jvt.sign({ id: id }, process.env.SECRET_JVT, { expiresIn: hr });

export const findByUsername = (username) => User.findOne({ username });

export const findByEmail = (email) => User.findOne({ email });

export const findById = (id) => User.findOne({ id });
