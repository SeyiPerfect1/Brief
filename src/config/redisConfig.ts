const redis = require('redis');

// Create a Redis client
const redisClient = redis.createClient();

// Test the Redis connection
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (error: any) => {
  console.error('Redis connection error:', error);
});

export default redisClient
