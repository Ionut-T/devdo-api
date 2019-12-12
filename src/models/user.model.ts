import { Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
  isVerified: boolean;
  createdAt: Date;

  checkPassword: (comparePassword: string, password: string) => Promise<boolean>;
  generateToken: () => string;
}
