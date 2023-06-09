export default {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI_DEVELOPMENT: process.env.MONGO_URI_DEVELOPMENT,
  MONGO_URI_TEST: process.env.MONGO_URI_TEST,
  REDIS_URI: process.env.REDIS_URI,
  ORIGIN: process.env.ORIGIN,
  JWT_SECRET: process.env.JWT_SECRET,
  GOOGLE_CLIENT_ID: process.env.CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.CLIENT_SECRET,
  GOOGLE_OAUTH_REDIRECT_URI: process.env.GOOGLE_OAUTH_REDIRECT_URI,
  SERVER_ROOT_URI: process.env.SERVER_ROOT_URI,
  AUTH_EMAIL: process.env.AUTH_EMAIL,
  BASE_URL: process.env.BASE_URL,
  GEO_API_KEY: process.env.GEO_API_KEY,
};
