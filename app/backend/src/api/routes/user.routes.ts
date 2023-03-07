import { Request, Response, Router } from 'express';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';
import ValidLogin from '../middlewares/ValidLogin';
import Auth from '../middlewares/Auth';

const routes = Router();

const auth = new Auth();
const validLogin = new ValidLogin();
const userService = new UserService();
const userController = new UserController(userService);

routes.post(
  '/',
  validLogin.validate,
  (req: Request, res: Response) => userController.login(req, res),
);

routes.get(
  '/role',
  auth.tokenValidation,
  (req: Request, res: Response) => userController.role(req, res),
);

export default routes;
