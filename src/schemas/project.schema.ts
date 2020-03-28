import { Schema, Model, model } from 'mongoose';
import { IProject } from '../models/project.model';
import uniqueValidator from 'mongoose-unique-validator';
import slugify from 'slugify';

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
  },
  url: String
});

projectSchema.plugin(uniqueValidator, {
  message: 'A project with the name {VALUE} already exists. Project name must be unique!'
});

projectSchema.pre('save', function(next) {
  const project = this as IProject;
  project.url = slugify(project.name, { lower: true });
  next();
});

// Populate tasks with creator's information.
projectSchema.pre(/^find/, function(next) {
  const project = this as IProject;
  project.populate('creator');
  next();
});

export const Project: Model<IProject> = model<IProject>('Project', projectSchema);
