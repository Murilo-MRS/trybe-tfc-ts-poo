import IMatch from './IMatch';
import IResponseMessage from './IResponseMessage';

export default interface IMatchService {
  findAll(query?: string): Promise<IResponseMessage<IMatch[]> >;
  updateMatchProgress(id: number): Promise<IResponseMessage<string> >;
}
