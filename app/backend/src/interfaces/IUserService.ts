import IResponseToken from './IResponseToken';
import IUser from './IUser';

export default interface IUserService {
  login(userBody: IUser): Promise<IResponseToken>;
}
