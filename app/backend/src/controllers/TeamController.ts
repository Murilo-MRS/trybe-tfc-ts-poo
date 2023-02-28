import { Request, Response } from 'express';
import ITeamService from '../interfaces/ITeamService';

class TeamController {
  private _service: ITeamService;

  constructor(service: ITeamService) {
    this._service = service;
  }

  public async getAllTeams(_req: Request, res: Response) {
    const result = await this._service.findAll();
    return res.status(200).json(result);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this._service.findById(+id);
    return res.status(200).json(result);
  }
}

export default TeamController;
