import { Router } from 'express';
import { create, findAll, findOne, updateOne, deleteOne } from '../controllers/task.controller';
import checkAuth from '../middleware/check-auth.middleware';

export class TaskRouter {
  public router: Router;

  constructor() {
    this.router = Router({ mergeParams: true });
    this.routes();
  }

  private routes(): void {
    // /api/v2/projects/:projectUrl/tasks
    this.router
      .route('/')
      .post(checkAuth, create)
      .get(checkAuth, findAll);

    // /api/v2/projects/:projectUrl/tasks/:id
    this.router
      .route('/:taskId')
      .get(checkAuth, findOne)
      .put(checkAuth, updateOne)
      .delete(checkAuth, deleteOne);
  }
}
