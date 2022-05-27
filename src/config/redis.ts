// import { createClient } from "async-redis";
// import * as Redis from "ioredis";
import * as redis from "redis";
import * as dotenv from "dotenv";

dotenv.config();

const NODE_ENV = process.env.NODE_ENV as string;
const CONFIG_REDIS_URL = process.env.CONFIG_REDIS_URL as string;

const client = NODE_ENV === "development" ? redis.createClient() : redis.createClient({ url: CONFIG_REDIS_URL });

client.on("connect", () => {
	console.log("Config Client connected to redis ... ");
});

client.on("ready", () => {
	console.log("Config Client connected to redis and ready to use ...");
});

client.on("error", (error) => {
	console.log(`Config Redis Error :: ${error.message}`);
});

client.on("end", () => {
	console.log("Config Client disconnected from redis ... ");
});

process.on("SIGINT", () => {
	client.quit();
});

// return client;
// };

export default client;
