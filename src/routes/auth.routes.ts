import { Router } from 'express';
import {
  signup,
  login,
  verifyEmailToken,
  resendVerificationToken,
  forgotPassword,
  resetPassword
} from '../controllers/auth.controller';

export class AuthRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    // /api/v2/auth/
    this.router.post('/signup', signup);
    this.router.post('/login', login);
    this.router.get('/verify-email/:token', verifyEmailToken);
    this.router.post('/verify-email/token', resendVerificationToken);
    this.router.post('/reset-password', forgotPassword);
    this.router.patch('/reset-password/:token', resetPassword);
  }
}
