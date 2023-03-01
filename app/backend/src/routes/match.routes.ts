import { Request, Response, Router } from 'express';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';

const routes = Router();

const matchService = new MatchService();
const matchController = new MatchController(matchService);

routes.get(
  '/',
  (req: Request, res: Response) => matchController.getAllMatches(req, res),
);

routes.patch('/:id/finish', (req: Request, res: Response) => matchController.finishMatch(req, res));

export default routes;
