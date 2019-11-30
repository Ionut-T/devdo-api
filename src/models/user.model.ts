import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  confirmPassword: string;
  checkPassword: (comparePassword: string, password: string) => {};
}
