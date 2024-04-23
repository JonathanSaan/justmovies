import jvt from "jsonwebtoken";
import { findByIdService } from "../services/user.service.js";

const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const parts = authorization.split(" ");
    const [schema, token] = parts;

    if (!authorization || schema !== "Bearer") {
      res.status(401).send({ message: "Unauthorized." });
    }

    jvt.verify(token, process.env.SECRET_JVT, async (error, decoded) => {
      if (error) {
        res.status(401).send({ message: "You need to be logged in to do that action" });
      }
      console.log(decoded)
      const user = await findByIdService(decoded.id);

      if (!user || !user.id) {
        res.status(404).send({ message: "Invalid token!" });
      }

      req.userId = user._id;
      next();
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default authMiddleware;
