import { Request, Response } from 'express';
import ILeaderBoardService from '../interfaces/ILeaderBoardService';

class LeaderBoardController {
  private _service: ILeaderBoardService;

  constructor(service: ILeaderBoardService) {
    this._service = service;
  }

  public async getHomeResults(_req: Request, res: Response) {
    const { status, message } = await this._service.getHomeResults();

    return res.status(status).json(message);
  }

// getLeaderboard
// getAwayResults
}

export default LeaderBoardController;
