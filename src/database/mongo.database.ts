import mongoose from 'mongoose';
import { MONGODB_URI } from '../utils/config';

const settings = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

export class MongoDatabase {
  async connection(): Promise<void> {
    try {
      await mongoose.connect(MONGODB_URI, settings);
      console.log('    🤟 MongoDB is connected! 🤟');
    } catch (error) {
      console.log('😡 😡 😡  MongoDB connection error: ' + error);
    }
  }
}
