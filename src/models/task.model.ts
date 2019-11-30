import { Document } from 'mongoose';

enum Status {
  Todo = 'todo',
  Doing = 'doing',
  Done = 'done'
}

export interface ITask extends Document {
  title: string;
  description: string;
  status?: Status.Todo | Status.Doing | Status.Done;
}
