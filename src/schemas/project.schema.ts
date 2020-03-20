import { Schema, Model, model } from 'mongoose';
import { IProject } from '../models/project.model';
import uniqueValidator from 'mongoose-unique-validator';

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    trim: true
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

projectSchema.plugin(uniqueValidator);

// Populate tasks with creator's information.
projectSchema.pre(/^find/, function(next) {
  const task = this as IProject;
  task.populate('creator');
  next();
});

export const Project: Model<IProject> = model<IProject>('Project', projectSchema);
