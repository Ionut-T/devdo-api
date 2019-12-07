import { MongoDatabase } from './src/database/mongo.database';
import { Task } from './src/schemas/task.schema';
import { User } from './src/schemas/user.schema';

new MongoDatabase().connection();

// Delete all data from database
const emptyDB = async () => {
  try {
    if (process.argv[2] === '--tasks') {
      await Task.deleteMany({});
    } else if (process.argv[2] === '--users') {
      await User.deleteMany({});
    } else if (process.argv[2] === '--all') {
      await Task.deleteMany({});
      await User.deleteMany({});
    }
    console.log('Database successfully cleared');
  } catch (error) {
    console.log(`There was this error: ${error}`);
  }

  process.exit();
};

emptyDB();
