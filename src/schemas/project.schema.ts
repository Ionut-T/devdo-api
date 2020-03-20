import { Schema, Model, model } from 'mongoose';
import { IProject } from '../models/project.model';

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

export const Project: Model<IProject> = model<IProject>('Project', projectSchema);
