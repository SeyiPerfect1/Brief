import mongoose from 'mongoose';
import log from '../utility/logger';
import CONFIG from '../config/environment'

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    if (CONFIG.NODE_ENV === 'development' || CONFIG.NODE_ENV === '') {
      const URI: any = CONFIG.MONGO_URI as string;
      await mongoose.connect(URI);
    
      log.info(`MongoDB Connected`);
    } else {
      console.log("Implement this properly later")
    }

  } catch (error) {
    console.log(error)
    log.info('There is an error in the database', error);
    process.exit(1);
  }
}; 

export default connectDB;