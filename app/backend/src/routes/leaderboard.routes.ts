import { Request, Response, Router } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';
import LeaderBoardController from '../controllers/LeaderBoardController';

const routes = Router();

const leaderBoardService = new LeaderBoardService();
const leaderBoardController = new LeaderBoardController(leaderBoardService);

routes.get(
  '/',
  (req: Request, res: Response) => leaderBoardController.getLeaderboard(req, res),
);

routes.get(
  '/home',
  (req: Request, res: Response) => leaderBoardController.getResults(req, res),
);

routes.get(
  '/away',
  (req: Request, res: Response) => leaderBoardController.getResults(req, res),
);

export default routes;
