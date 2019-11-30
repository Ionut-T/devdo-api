import { Schema, model, Model } from 'mongoose';
import { ITask } from '../models/task.model';

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['todo', 'doing', 'done'],
    default: 'todo'
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// Populate tasks with creator's information
taskSchema.pre(/^find/, function (next) {
  const task = this as any;
  task.populate('creator');
  next();
});

export const Task: Model<ITask> = model<ITask>('Task', taskSchema);
