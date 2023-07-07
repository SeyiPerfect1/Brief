import mongoose from 'mongoose';
import log from '../utility/logger';
import CONFIG from '../config/environment'

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    if (CONFIG.NODE_ENV === 'development' || CONFIG.NODE_ENV === '' || CONFIG.NODE_ENV === 'production' ) {
      const URI: any = CONFIG.MONGO_URI_DEVELOPMENT as string;
      await mongoose.connect(URI);
    
      log.info(`MongoDB Connected to Development Database`);
    } else{
      const URI: any = CONFIG.MONGO_URI_TEST as string;
      await mongoose.connect(URI);
    
      log.info(`MongoDB Connected to Test Database`);
    }

  } catch (error) {
    console.log(error)
    log.info('There is an error in the database', error);
    process.exit(1);
  }
}; 

export default connectDB;