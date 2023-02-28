import { Request, Response, Router } from 'express';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';

const routes = Router();

const userService = new UserService();
const userController = new UserController(userService);

routes.post('/', (req: Request, res: Response) => userController.login(req, res));

export default routes;
