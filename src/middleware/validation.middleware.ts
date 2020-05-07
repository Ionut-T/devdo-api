/* eslint-disable @typescript-eslint/camelcase */
import { check, validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { Err } from '../utils/error-handler';

export const signUpValidationRules = (): ValidationChain[] => {
  return [
    check('firstName', 'First name is not valid.')
      .isLength({ min: 2 })
      .trim(),
    check('email', 'Email is not valid.')
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false }),
    check('password', 'Password must have minimum 6 characters.').isLength({ min: 6 }),
    check('confirmPassword', 'You must confirm your password.').isLength({ min: 1 })
  ];
};

export const logInValidationRules = (): ValidationChain[] => {
  return [
    check('email', 'Email is not valid.')
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false }),
    check('password', 'You must enter a password.')
      .isLength({ min: 1 })
      .trim()
  ];
};

export const resetPasswordValidationRules = (): ValidationChain[] => {
  return [
    check('password', 'Password must have minimum 6 characters.')
      .isLength({ min: 6 })
      .trim(),
    check('confirmPassword', 'You must confirm your password.')
      .isLength({ min: 1 })
      .trim()
  ];
};

export const emailValidationRules = (): ValidationChain => {
  return check('email', 'Email is not valid.')
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false });
};

export const projectValidationRules = (): ValidationChain[] => {
  return [
    check('name', 'Name must have minimum 3 characters and maximum 20 characters.')
      .isLength({ min: 3, max: 20 })
      .trim(),
    check('description', 'Description must have maximum 100 characters.')
      .isLength({ max: 100 })
      .trim()
  ];
};

export const taskValidationRules = (): ValidationChain[] => {
  return [
    check('title', 'Title must have minimum 3 characters and maximum 20 characters.')
      .isLength({ min: 3, max: 20 })
      .trim(),
    check('description', 'Description must have minimum 3 characters and maximum 100 characters.')
      .isLength({
        min: 3,
        max: 100
      })
      .trim()
  ];
};

export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const validationErrors = validationResult(req)
    .array()
    .map(err => err.msg)
    .toString()
    .replace(/,/gi, ' ');

  if (!validationResult(req).isEmpty()) {
    return next(new Err(validationErrors, 422));
  }

  return next();
};
