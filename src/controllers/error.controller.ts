import { CastError, Error } from 'mongoose';
import { MongoError } from 'mongodb';
import { Request, Response, NextFunction } from 'express';
import Err from '../utils/error-handler';

type ValidationError = Error.ValidationError;

export class ErrorController {
  public errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
      this.sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
      let error = { ...err };

      if (error.name === 'CastError') {
        error = this.handleCastErrorDB(error);
      }
      if (error.code === 11000) {
        error = this.handleDuplicateFieldsDB(error);
      }
      if (error.name === 'ValidationError') {
        error = this.handleValidationErrorDB(error);
      }

      if (error.name === 'JsonWebTokenError') {
        error = this.handleJWTError();
      }
      if (error.name === 'TokenExpiredError') {
        error = this.handleJWTExpiredError();
      }

      this.sendErrorProd(error, res);
    }
  }

  // Database errors.
  private handleCastErrorDB(err: CastError): Err {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new Err(message, 400);
  }

  private handleDuplicateFieldsDB(err: MongoError): Err {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    console.log(value);

    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new Err(message, 400);
  }

  private handleValidationErrorDB(err: ValidationError): Err {
    const errors = Object.values(err.errors).map(error => error.message);

    const message = `Invalid input data. ${errors.join('. ')}`;
    return new Err(message, 400);
  }

  // JWT errors.
  private handleJWTError() {
    new Err('Invalid token. Please log in again!', 401);
  }

  private handleJWTExpiredError() {
    new Err('Your session has expired! Please log in again.', 401);
  }

  // Development errors.
  private sendErrorDev(err: any, res: any) {
    res.status(err.statusCode).json({ status: err.status, error: err, message: err.message, stack: err.stack });
  }

  // Production errors.
  private sendErrorProd(err: any, res: any) {
    // Operational, trusted error: send message to client.
    if (err.isOperational) {
      res.status(err.statusCode).json({ status: err.status, message: err.message });

      // Programming or other unknown error.
    } else {
      // Log error.
      console.error('ERROR', err);

      // Send generic message.
      res.status(500).json({ status: 'error', message: 'Something went wrong!' });
    }
  }
}
