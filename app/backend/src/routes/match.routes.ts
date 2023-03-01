import { Request, Response, Router } from 'express';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';
import Auth from '../middlewares/Auth';

const routes = Router();

const auth = new Auth();
const matchService = new MatchService();
const matchController = new MatchController(matchService);

routes.get(
  '/',
  (req: Request, res: Response) => matchController.getAllMatches(req, res),
);

routes.post(
  '/',
  auth.tokenValidation,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

routes.patch(
  '/:id/finish',
  auth.tokenValidation,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

routes.patch(
  '/:id',
  auth.tokenValidation,
  (req: Request, res: Response) => matchController.updateInProgressMatch(req, res),
);

export default routes;
