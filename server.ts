import express from 'express';
import log from './src/utility/logger';
import "dotenv/config";
import ExpressApp from './src/utility/ExpressApp';
import connectDB from './src/config/dbConfig';
import dotenv from 'dotenv';

const StartServer = async () => {
  
  const app = express();
  dotenv.config();

  await ExpressApp(app);

  const PORT = process.env.PORT || 1335;

  await connectDB();

  app.listen(PORT, () => {
    log.info(`Server listening on ${PORT}`);
  });
};

export default StartServer();