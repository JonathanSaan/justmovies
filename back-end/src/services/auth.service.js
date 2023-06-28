import jvt from "jsonwebtoken";
import User from "../models/User.js";

export const loginService = (email) =>
  User.findOne({ email: email }).select("+password");

export const createService = (body) => User.create(body);

export const generateTokenService = (id, hr) =>
  jvt.sign({ id: id }, process.env.SECRET_JVT, { expiresIn: hr });

export const findByUsernameService = (username) => User.findOne({ username });

export const findByEmailService = (email) => User.findOne({ email });

export const validateService = async (req, res, token) => {
  const decoded = jvt.verify(token, process.env.SECRET_JVT);
  const user = await User.findById(decoded.id);

  if (!user || !user.id) {
    return res.status(404).send({ message: "Invalid token!" });
  }

  const currentTimestamp = Math.floor(Date.now() / 1000);
  if (decoded.exp < currentTimestamp) {
    return res.status(401).send({ message: "Session expired. Please repeat the protocol." });
  }

  req.userId = user._id;
};
