import { Document } from 'mongoose';
import { ITask } from './task.model';

export interface IProject extends Document {
  name: string;
  description: string;
  author: string;
  createdAt: Date;
  tasks: ITask[];
}
