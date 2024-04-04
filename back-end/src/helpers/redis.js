import redis from "redis";

const client = redis.createClient(6379);

client.on("connect", () => {
  console.log("Redis Connected!");
});

export default client;
