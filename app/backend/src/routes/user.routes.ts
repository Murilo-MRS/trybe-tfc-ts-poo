import { Request, Response, Router } from 'express';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';
import ValidLogin from '../middlewares/ValidLogin';

const routes = Router();

const validLogin = new ValidLogin();
const userService = new UserService();
const userController = new UserController(userService);

routes.post(
  '/',
  validLogin.validate,
  (req: Request, res: Response) => userController.login(req, res),
);

export default routes;
