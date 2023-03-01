import { Request, Response } from 'express';
import IMatchService from '../interfaces/IMatchService';

class MatchController {
  private _service: IMatchService;

  constructor(service: IMatchService) {
    this._service = service;
  }

  public async getAllMatches(req: Request, res: Response) {
    const query = req.query.inProgress;

    const { status, message } = await this._service.findAll(query as string);

    return res.status(status).json(message);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;

    const { status, message } = await this._service.finishMatch(+id);

    return res.status(status).json({ message });
  }

  public async updateInProgressMatch(req: Request, res: Response) {
    const { id } = req.params;

    const { status, message } = await this._service.updateInProgressMatch(+id, req.body);

    return res.status(status).json({ message });
  }

  public async createMatch(req: Request, res: Response) {
    const { status, message } = await this._service.createMatch(req.body);

    return res.status(status).json(message);
  }
}

export default MatchController;
