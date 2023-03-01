import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import authenticateToken from '../utils/jwt/authenticateToken';
// import { JWT_SECRET } from './jwtConfig';

export default class Auth {
  public tokenValidation = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { authorization } = req.headers;

    if (!authorization) throw new AppError(401, 'Token not found');

    try {
      const user = authenticateToken(authorization);

      res.locals.user = user;

      next();
    } catch (error) {
      throw new AppError(401, 'Token must be a valid token');
    }
  };
}
