import IResponse from './IResponse';
import IUser from './IUser';

export default interface IUserService {
  login(userBody: IUser): Promise<IResponse<string> >;
}
