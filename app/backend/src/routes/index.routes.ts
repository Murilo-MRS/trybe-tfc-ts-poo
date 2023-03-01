import { Router } from 'express';
import teamRouter from './team.routes';
import userRouter from './user.routes';
import matchRouter from './match.routes';

const routes = Router();

routes.use('/teams', teamRouter);
routes.use('/login', userRouter);
routes.use('/matches', matchRouter);

export default routes;
