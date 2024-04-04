import redis from "redis";
import dotenv from "dotenv";

dotenv.config();

const client = redis.createClient({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: 6379
});

client.on("connect", () => {
  console.log("Redis Connected!");
});

client.on("error", (error) => {
  console.log(`Error connecting to Redis: ${error}`);
});

export default client;
