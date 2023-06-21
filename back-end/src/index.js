import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connetcDatabase from "./database/db.js";
import authRoute from "./routes/auth.route.js";
import moviesRouter from "./routes/movies.route.js";
import userRouter from "./routes/user.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

connetcDatabase();
app.use(cors({ origin: "*" }));

app.use(express.json());
app.use("/", authRoute);
app.use("/movies", moviesRouter);
app.use("/profile", userRouter);

app.listen(port, () => console.log("working server"));
