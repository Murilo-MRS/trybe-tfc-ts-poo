import ILeaderBoard from './ILeaderBoard';
import IResponseMessage from './IResponseMessage';

export default interface ILeaderBoardService {
  getHomeResults(): Promise<IResponseMessage<ILeaderBoard[]> >;
}
