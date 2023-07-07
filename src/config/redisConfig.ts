const Redis = require("ioredis");
import { promisify } from "util";
import CONFIG from "../config/environment";
import { URL } from "url";
import log from "../utility/logger";

const redisUrlString = CONFIG.REDIS_URI as string;

const renderRedis = new Redis(redisUrlString);
// const redisClient = redis.createClient(redisConfig);

renderRedis.on("connect", () => {
  log.info("Connected to Redis");
});

renderRedis.on("error", (error: any) => {
  console.error("Redis connection error:", error);
});

// // Promisify Redis client methods
// const redisGetAsync = promisify(renderRedis.get).bind(renderRedis);
// const redisSetAsync = promisify(renderRedis.set).bind(renderRedis);

// // Wrap Redis client methods with async/await
// const asyncRedisGet = async (key: string) => {
//   try {
//     const value = await redisGetAsync(key);
//     // const parsedValue = JSON.parse(value);
//     return value;
//   } catch (error) {
//     console.error("Error getting values:", error);
//     throw error;
//   }
// };

// //when setting a key to value pair
// const asyncRedisSet = async (key: string, values: string) => {
//   try {
//     const jsonValue = JSON.stringify(values);
//   const result = await redisSetAsync(key, jsonValue);
//   return result;
// } catch (error) {
//     console.error("Error getting values:", error);
//     throw error;
//   }
// };

// Promisify the Redis client's `hgetall` method
const hgetallAsync = promisify(renderRedis.hgetall).bind(renderRedis);
const hmsetAsync = promisify(renderRedis.hmset).bind(renderRedis);

// function to retrieve the values associated with the originalURL key
const getValuesFromRedis = async (
  key: string
): Promise<Record<string, string> | null> => {
  try {
    const values = await hgetallAsync(key);
    if (values) {
      return values;
    }
    return null;
  } catch (error) {
    console.error("Error retrieving values as hash from Redis:", error);
    throw error;
  }
};

// function to set values for the originalURL key
const setValuesInRedis = async (
  key: string,
  values: Record<string, string>
): Promise<void> => {
  try {
    const result = await hmsetAsync(key, values);
    return result;
  } catch (error) {
    console.error("Error setting values in Redis:", error);
    throw error;
  }
};

export { renderRedis, getValuesFromRedis, setValuesInRedis };
