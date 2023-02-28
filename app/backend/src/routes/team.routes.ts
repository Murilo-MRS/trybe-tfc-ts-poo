import { Request, Response, Router } from 'express';
import TeamService from '../services/TeamService';
import TeamController from '../controllers/TeamController';

const routes = Router();

const teamService = new TeamService();
const teamController = new TeamController(teamService);

routes.get('/', (req: Request, res: Response) => teamController.getAllTeams(req, res));
// teamRouter.get('/:id', (req: Request, res: Response) => teamController.getTeamById(req, res));

export default routes;
