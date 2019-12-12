import { Router } from 'express';
import { signup, login, verifyEmailToken, resendVerificationToken } from '../controllers/auth.controller';

export class AuthRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    // /api/v2/auth
    this.router.post('/signup', signup);
    this.router.post('/login', login);
    this.router.get('/:token', verifyEmailToken);
    this.router.post('/token', resendVerificationToken);
  }
}
