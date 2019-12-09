import path from 'path';
import express, { Router, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';

import { MongoDatabase } from './database/mongo.database';
import { TaskRouter } from './routes/task.routes';
import { AuthRouter } from './routes/auth.routes';
import { UserRouter } from './routes/user.routes';
import { Err } from './utils/error-handler';
import errorController from './controllers/error.controller';

export class Application {
  public app: express.Application;
  private db = new MongoDatabase().connection;
  private taskRouter: Router;
  private authRouter: Router;
  private userRouter: Router;

  constructor() {
    this.app = express();
    this.db();
    this.taskRouter = new TaskRouter().router;
    this.authRouter = new AuthRouter().router;
    this.userRouter = new UserRouter().router;
    this.config();
    this.routes();
    this.errorHandling();
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
    this.app.set('view engine', 'pug');
    this.app.set('views', path.join(__dirname, 'email-templates'));
  }

  private routes(): void {
    this.app.use('/api/v2/tasks', this.taskRouter);
    this.app.use('/api/v2/auth', this.authRouter);
    this.app.use('/api/v2/user', this.userRouter);
    this.app.all('*', (req, _res, next) => next(new Err(`Can't find ${req.originalUrl}!`, 404)));
  }

  private errorHandling(): void {
    this.app.use(errorController);
  }
}
