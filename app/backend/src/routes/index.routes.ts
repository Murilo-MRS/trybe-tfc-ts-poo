import { Router } from 'express';
import teamRouter from './team.routes';
import userRouter from './user.routes';

const routes = Router();

routes.use('/teams', teamRouter);
routes.use('/login', userRouter);

export default routes;
