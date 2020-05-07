import { Document } from 'mongoose';
import { IUser } from './user.model';

export interface IToken extends Document {
  userId: IUser;
  token: string;
  createdAt: Date;
}
