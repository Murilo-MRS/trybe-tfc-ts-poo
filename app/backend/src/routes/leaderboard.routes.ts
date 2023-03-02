import { Request, Response, Router } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';
import LeaderBoardController from '../controllers/LeaderBoardController';
// import ValidLogin from '../middlewares/ValidLogin';
// import Auth from '../middlewares/Auth';

const routes = Router();

// const auth = new Auth();
// const validLogin = new ValidLogin();
const leaderBoardService = new LeaderBoardService();
const leaderBoardController = new LeaderBoardController(leaderBoardService);

// routes.get(
//   '/',
//   (req: Request, res: Response) => leaderBoardController.getLeaderboard(req, res),
// );

routes.get(
  '/home',
  (req: Request, res: Response) => leaderBoardController.getHomeResults(req, res),
);

// routes.get(
//   '/away',
//   (req: Request, res: Response) => leaderBoardController.getAwayResults(req, res),
// );

export default routes;
