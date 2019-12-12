import { Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  isVerified: boolean;
  token: string;
  tokenCreatedAt: Date;

  checkPassword: (comparePassword: string, password: string) => Promise<boolean>;
  generateToken: () => string;
}
