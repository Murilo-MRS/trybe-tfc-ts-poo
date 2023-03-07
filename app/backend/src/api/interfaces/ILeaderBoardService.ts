import ILeaderBoard from './ILeaderBoard';
import IResponseMessage from './IResponseMessage';

export default interface ILeaderBoardService {
  getResults(path: string): Promise<IResponseMessage<ILeaderBoard[]> >;
  leaderboard(): Promise<IResponseMessage<ILeaderBoard[]> >;
}
