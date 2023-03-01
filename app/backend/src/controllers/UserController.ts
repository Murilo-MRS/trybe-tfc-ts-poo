import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  private _service: UserService;

  constructor(service: UserService) {
    this._service = service;
  }

  public async login(req: Request, res: Response) {
    const { status, token } = await this._service.login(req.body);
    return res.status(status).json({ token });
  }
}

export default UserController;
