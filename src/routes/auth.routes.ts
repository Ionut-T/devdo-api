import { Router } from 'express';
import {
  signup,
  login,
  verifyEmailToken,
  resendVerificationToken,
  forgotPassword,
  resetPassword
} from '../controllers/auth.controller';
import {
  signUpValidationRules,
  validate,
  logInValidationRules,
  emailValidationRules,
  resetPasswordValidationRules
} from '../middleware/validation.middleware';

export class AuthRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    // /api/v2/auth/
    this.router.post('/signup', signUpValidationRules(), validate, signup);
    this.router.post('/login', logInValidationRules(), validate, login);
    this.router.get('/verify-email/:token', verifyEmailToken);
    this.router.post('/verify-email/token', emailValidationRules(), validate, resendVerificationToken);
    this.router.post('/reset-password', emailValidationRules(), validate, forgotPassword);
    this.router.patch('/reset-password/:token', resetPasswordValidationRules(), validate, resetPassword);
  }
}
