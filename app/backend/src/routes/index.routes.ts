import { Router } from 'express';
import teamRouter from './team.routes';

const routes = Router();

routes.use('/teams', teamRouter);

export default routes;
