import { Request, Response } from 'express';
import IUserService from '../interfaces/IUserService';

class UserController {
  private _service: IUserService;

  constructor(service: IUserService) {
    this._service = service;
  }

  public async login(req: Request, res: Response) {
    const { status, message } = await this._service.login(req.body);
    return res.status(status).json({ message });
  }
}

export default UserController;
