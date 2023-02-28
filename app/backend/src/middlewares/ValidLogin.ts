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
    if (error) {
      throw new AppError(400, error.message);
    }

    next();
  };
}
