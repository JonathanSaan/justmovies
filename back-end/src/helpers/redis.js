import redis from "redis";

const client = redis.createClient(6379);

client.on("connect", () => {
  console.log("Redis Connected!");
});

client.on("error", (error) => {
  console.log(`Error connecting to Redis: ${error}`);
});

export default client;
