import dotenv from "dotenv";
import redis from "redis";

dotenv.config();

const client = redis.createClient({
  url: process.env.REDIS_URL_EXTERNAL
});

client.on("connect", () => {
  console.log("Redis Connected!");
});

client.on("error", (error) => {
  console.log(`Error connecting to Redis: ${error}`);
});

export default client;
