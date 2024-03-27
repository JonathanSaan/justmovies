import redis from "redis";

const client = redis.createClient(6379);

export default client;