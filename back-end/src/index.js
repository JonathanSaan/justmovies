import express from "express";
import dotenv from "dotenv";
import redis from "redis";
import cors from "cors";

import connectDatabase from "./database/db.js";
import authRoute from "./routes/auth.route.js";
import moviesRouter from "./routes/movies.route.js";
import userRouter from "./routes/user.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const client = redis.createClient(6379);

connectDatabase();
app.use(cors({ origin: process.env.SERVER_FRONT_URL }));

app.use(express.json());
app.use("/", authRoute);
app.use("/movies", moviesRouter);
app.use("/profile", userRouter);

const startup = async () => {
  await client.connect();
  app.listen(port, () => console.log("working server"));
};

startup();
