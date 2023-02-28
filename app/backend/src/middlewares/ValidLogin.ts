import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import LoginBodySchema from './validations/schemas';

export default class ValidLogin {
  public validate = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { error } = LoginBodySchema.validate(req.body);
    if (error?.message === 'All fields must be filled') {
      throw new AppError(400, error.message);
    }
    if (error?.message === 'Invalid email or password') {
      throw new AppError(401, error.message);
    }

    next();
  };
}
