import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import generateToken from '../utils/jwt/generateToken';
import User from '../database/models/UserModel';
import IUser from '../interfaces/IUser';
import AppError from '../errors/AppError';

class UserService {
  private model: ModelStatic<User> = User;

  public async login(userBody: IUser) {
    const user = await this.model.findOne({
      where: { email: userBody.email },
    });
    if (!user) throw new AppError(401, 'Invalid email or password');

    const validatePassword = bcrypt.compareSync(userBody.password, user.password);
    if (!validatePassword) throw new AppError(401, 'Invalid email or password');

    const { dataValues } = user;
    const token = generateToken(dataValues);

    return { status: 200, token };
  }
}

export default UserService;
