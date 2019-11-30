import { Router } from 'express';
import { signup, login } from '../controllers/user.controller';

export class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    // /api/v2/user
    this.router.post('/signup', signup);
    this.router.post('/login', login);
  }
}
