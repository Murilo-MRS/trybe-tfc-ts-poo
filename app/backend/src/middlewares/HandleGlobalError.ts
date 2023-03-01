import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';

class HandleGlobalError {
  public static handleError(
    error: AppError,
    _request: Request,
    response: Response,
    _next: NextFunction,
  ) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';

    if (error instanceof AppError) {
      return response
        .status(status)
        .json({
          message,
        });
    }
  }
}

export default HandleGlobalError;
