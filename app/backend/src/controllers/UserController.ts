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

  public async role(req: Request, res: Response) {
    const { authorization } = req.headers;

    const { status, role } = await this._service.role(authorization as string);

    return res.status(status).json({ role });
  }
}

export default UserController;
