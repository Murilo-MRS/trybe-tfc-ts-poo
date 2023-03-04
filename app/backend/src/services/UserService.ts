import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import authenticateToken from '../utils/jwt/authenticateToken';
import IResponseToken from '../interfaces/IResponseToken';
import IUserService from '../interfaces/IUserService';
import generateToken from '../utils/jwt/generateToken';
import User from '../database/models/UserModel';
import IUser from '../interfaces/IUser';
import AppError from '../errors/AppError';
import IPayload from '../interfaces/IPayload';

class UserService implements IUserService {
  private model: ModelStatic<User> = User;
  private authenticateToken = authenticateToken;

  public async login(userBody: IUser): Promise<IResponseToken> {
    const user = await this.model.findOne({
      where: { email: userBody.email },
      raw: true,
    });

    if (!user) throw new AppError(401, 'Invalid email or password');

    const validatePassword = bcrypt.compareSync(userBody.password, user.password);
    if (!validatePassword) throw new AppError(401, 'Invalid email or password');

    const token = generateToken({
      username: user.username, role: user.role, email: user.email,
    });

    return { status: 200, token };
  }

  public async role(token: string) {
    const { role } = this.authenticateToken(token) as IPayload;

    return { status: 200, role };
  }
}

export default UserService;
