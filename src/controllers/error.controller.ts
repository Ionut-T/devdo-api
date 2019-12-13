import { CastError, Error } from 'mongoose';
import { MongoError } from 'mongodb';
import { Request, Response, NextFunction } from 'express';
import { Err } from '../utils/error-handler';
import { ENVIRONMENT } from '../utils/config';
import logger from '../utils/logger';

type ValidationError = Error.ValidationError;

// Database errors.
const handleCastErrorDB = (err: CastError): Err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new Err(message, 400);
};

const handleDuplicateFieldsDB = (err: MongoError): Err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new Err(message, 400);
};

const handleValidationErrorDB = (err: ValidationError): Err => {
  const errors = Object.values(err.errors).map(error => error.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new Err(message, 400);
};

// JWT errors.
const handleJWTError = () => {
  new Err('Invalid token. Please log in again!', 401);
};

const handleJWTExpiredError = () => {
  new Err('Your session has expired! Please log in again.', 401);
};

// Development errors.
const sendErrorDev = (err: any, res: Response) => {
  res.status(err.statusCode).json({ status: err.status, error: err, message: err.message, stack: err.stack });
};

// Production errors.
const sendErrorProd = (err: any, res: Response) => {
  // Operational, trusted error: send message to client.
  if (err.isOperational) {
    res.status(err.statusCode).json({ status: err.status, message: err.message });

    // Programming or other unknown error.
  } else {
    // Log error.
    logger.error('ERROR', err);

    // Send generic message.
    res.status(500).json({ status: 'error', message: 'Something went wrong!' });
  }
};

const errorController = (err: any, req: Request, res: Response, _next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (ENVIRONMENT === 'development') {
    sendErrorDev(err, res);
  } else if (ENVIRONMENT === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'CastError') {
      error = handleCastErrorDB(error);
    }
    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }
    if (error.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    }

    if (error.name === 'JsonWebTokenError') {
      error = handleJWTError();
    }
    if (error.name === 'TokenExpiredError') {
      error = handleJWTExpiredError();
    }

    sendErrorProd(error, res);
  }
};

export default errorController;
