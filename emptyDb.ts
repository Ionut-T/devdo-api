import { MongoDatabase } from './src/database/mongo.database';
import { Project } from './src/schemas/project.schema';
import { Task } from './src/schemas/task.schema';
import { User } from './src/schemas/user.schema';
import { Token } from './src/schemas/token.schema';
import { DEV_ENV } from './src/utils/config';

new MongoDatabase().connection();

// Delete all data from database.
const emptyDB = async (): Promise<never> => {
  try {
    if (process.argv[2] === '--projects') {
      await Project.deleteMany({});
    } else if (process.argv[2] === '--tasks') {
      await Task.deleteMany({});
    } else if (process.argv[2] === '--users') {
      await User.deleteMany({});
    } else if (process.argv[2] === '--tokens') {
      await Token.deleteMany({});
    } else if (process.argv[2] === '--all') {
      await Project.deleteMany({});
      await Task.deleteMany({});
      await User.deleteMany({});
      await Token.deleteMany({});
    }
    console.log('Database successfully cleared');
  } catch (error) {
    console.log(`There was this error: ${error}`);
  }

  process.exit();
};

if (DEV_ENV) {
  emptyDB();
}
