/* eslint-disable no-console */
import express, { Router, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';

import { MongoDatabase } from './database/mongo.database';
import { TaskRouter } from './routes/task.routes';
import { UserRouter } from './routes/user.routes';

export class Application {
  public app: express.Application;
  private db = new MongoDatabase().connection;
  private taskRouter: Router;
  private userRouter: Router;

  constructor() {
    this.app = express();
    this.db();
    this.taskRouter = new TaskRouter().router;
    this.userRouter = new UserRouter().router;
    this.config();
    this.routes();
  }

  private config(): void {
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }
    // Set CORS
    this.app.use((_req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
      next();
    });

    this.app.use(bodyParser.json());
    this.app.use(helmet());
    this.app.use(compression());
  }

  private routes(): void {
    this.app.use('/api/v2/tasks', this.taskRouter);
    this.app.use('/api/v2/user', this.userRouter);
  }
}
