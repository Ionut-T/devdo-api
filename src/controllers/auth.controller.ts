import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../schemas/user.schema';
import asyncWrapper from '../utils/async-wrapper';
import { Err } from '../utils/error-handler';
import { Email } from '../utils/email';
import { Token } from '../schemas/token.schema';
import { JWT_SECRET, VERIFY_EMAIL_URL } from '../utils/config';

// Create user
export const signup = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { firstName, email, password, confirmPassword } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new Err('Authentication failed! A user with this email address already exists.', 401));
    }

    const user = await User.create({ firstName, email, password, confirmPassword });

    const token = await Token.create({ userId: user._id, token: user.generateToken() });

    const url = `${VERIFY_EMAIL_URL}/${token.token}`;
    await new Email().sendVerificationEmail(user.email, user.firstName, url);

    res.status(201).json({
      message: 'User created',
      user: {
        id: user._id,
        firstName: user.firstName,
        email: user.email,
        isVerified: user.isVerified
      }
    });
  }
);

// Log in user
export const login = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new Err('Authentication failed! Email or password is incorrect.', 401));
    }

    const isCorrectPassword = await user.checkPassword(password, user.password);
    if (!isCorrectPassword) {
      return next(new Err('Authentication failed! Email or password is incorrect.', 401));
    }

    if (!user.isVerified) {
      return next(new Err('Please validate your email before login', 401));
    }

    const token = jwt.sign({ email: user.email, userId: user._id }, JWT_SECRET, { expiresIn: '8h' });

    res.status(200).json({ message: 'Authentication succeeded', token, expiresIn: 28800 });
  }
);

// Verify user's email.
export const verifyEmailToken = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = await Token.findOne({ token: req.params.token });

    if (!token) {
      return next(new Err('Your request to verify your email has expired.', 400));
    }

    const user = await User.findById(token.userId);

    if (user.isVerified) {
      return next(new Err('This account has already been verified.', 400));
    }

    res.status(200).json({ token });
  }
);

// Resend verification token.
export const resendVerificationToken = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(new Err('No user with this email address exists.', 400));
    }

    if (user.isVerified) {
      return next(new Err('This account has already been verified.', 400));
    }

    const token = await Token.create({ userId: user._id, token: user.generateToken() });

    const url = `${VERIFY_EMAIL_URL}/${token.token}`;
    await new Email().sendVerificationEmail(user.email, user.firstName, url);

    res.status(200).json({ token });
  }
);
