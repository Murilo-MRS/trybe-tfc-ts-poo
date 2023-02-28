import { Request, Response } from 'express';
import ITeamService from '../interfaces/ITeamService';

class TeamController {
  private _service: ITeamService;

  constructor(service: ITeamService) {
    this._service = service;
  }

  public async getAllTeams(req: Request, res: Response) {
    const result = await this._service.findAll();
    return res.status(200).json(result);
  }

  // getTeamById(req: Request, res: Response) {

  // }
}

export default TeamController;
