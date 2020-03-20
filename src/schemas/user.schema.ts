import crypto from 'crypto';
import { Schema, model, Model } from 'mongoose';
import validator from 'validator';
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcryptjs';
import { IUser } from '../models/user.model';

const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: validator.isEmail
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator(password: string): boolean {
        return password === this.password;
      }
    }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  }
});

userSchema.plugin(uniqueValidator);

// Hash password
userSchema.pre('save', async function(this: IUser, next) {
  if (!this.isModified('password')) {
    return next();
  }

  const user = this;

  user.password = await bcrypt.hash(user.password, 12);
  user.confirmPassword = undefined;

  next();
});

// Compare passwords
userSchema.methods.checkPassword = async (enteredPassword: string, userPassword: string): Promise<boolean> =>
  await bcrypt.compare(enteredPassword, userPassword);

userSchema.methods.generateToken = (): string => crypto.randomBytes(32).toString('hex');

export const User: Model<IUser> = model('User', userSchema);
