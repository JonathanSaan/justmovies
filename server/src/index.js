import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import connectDatabase from "./database/db.js";
import authRoute from "./routes/auth.route.js";
import moviesRouter from "./routes/movies.route.js";
import userRouter from "./routes/user.route.js";
import client from "./helpers/redis.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

connectDatabase();

app.use(bodyParser.json({ limit: "10mb" }));

app.use(cors({ 
  origin: process.env.SERVER_FRONT_URL,
  credentials: true
}));

app.use(express.json());
app.use("/", authRoute);
app.use("/movies", moviesRouter);
app.use("/profile", userRouter);

const startup = async () => {
  await client.connect();
  app.listen(port, () => console.log("working server"));
};

startup();
