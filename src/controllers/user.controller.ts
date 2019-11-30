import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { User } from '../schemas/user.schema';
import asyncWrapper from '../utils/async-wrapper';

// Create user
export const signup = asyncWrapper(
  async (req: Request, res: Response): Promise<Response> => {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(401).json({ message: 'A user with this email address already exists.' });
    }

    const user = await User.create(req.body);

    res.status(201).json({ message: 'User created', user });
  }
);

// Log in user
export const login = asyncWrapper(
  async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user || !user.checkPassword(password, user.password)) {
      return res.status(401).json({ message: 'Authentication failed! Email or password is incorrect.' });
    }

    const token = jwt.sign({ email: user.email, userId: user._id }, process.env.JWT_SECRET, { expiresIn: '8h' });

    res.status(200).json({ message: 'Authentication succeeded', token, expiresIn: 28800 });
  }
);
