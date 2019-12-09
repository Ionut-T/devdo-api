import { Router } from 'express';
import { update } from '../controllers/user.controller';

export class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    // /api/v2/user
    this.router.put('/:id', update);
  }
}
