import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';

function handleGlobalError(
  error: AppError,
  _request: Request,
  response: Response,
  _next: NextFunction,
) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response
    .status(status)
    .send({
      status,
      message,
    });
}

export default handleGlobalError;
