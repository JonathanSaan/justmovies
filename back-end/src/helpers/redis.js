import dotenv from "dotenv";
import redis from "redis";

dotenv.config();

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: 6379
});

client.on("connect", () => {
  console.log("Redis Connected!");
});

client.on("error", (error) => {
  console.log(`Error connecting to Redis: ${error}`);
});

export default client;
