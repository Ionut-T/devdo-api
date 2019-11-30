import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Middleware for checking authentication status
export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET);
    (req as any).userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Authentication failed'
    });
  }
};
