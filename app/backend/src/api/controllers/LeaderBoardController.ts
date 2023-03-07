import { Request, Response } from 'express';
import ILeaderBoardService from '../interfaces/ILeaderBoardService';

class LeaderBoardController {
  private _service: ILeaderBoardService;

  constructor(service: ILeaderBoardService) {
    this._service = service;
  }

  public async getResults(req: Request, res: Response) {
    const { status, message } = await this._service.getResults(req.path);

    return res.status(status).json(message);
  }

  public async getLeaderboard(_req: Request, res: Response) {
    const { status, message } = await this._service.leaderboard();

    return res.status(status).json(message);
  }

// getAwayResults
}

export default LeaderBoardController;
