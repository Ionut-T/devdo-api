import { Schema, model, Model } from 'mongoose';
import { ITask } from '../models/task.model';
import { Status } from '../utils/enums';

export const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  status: {
    type: String,
    enum: [Status.Todo, Status.Doing, Status.Done],
    default: Status.Todo
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
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

// Populate tasks with project and creator's information.
taskSchema.pre(/^find/, function(next) {
  const task = this as ITask;
  task.populate('project');
  task.populate('creator');
  next();
});

export const Task: Model<ITask> = model<ITask>('Task', taskSchema);
