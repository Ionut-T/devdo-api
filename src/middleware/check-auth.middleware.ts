import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../utils/config';

// Middleware for checking authentication status
export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken: any = jwt.verify(token, JWT_SECRET);
    (req as any).userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};
