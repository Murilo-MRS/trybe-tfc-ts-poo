import IBodyMatchGoals from './IBodyMatchGoals';
import IMatch from './IMatch';
import IResponseMessage from './IResponseMessage';

export default interface IMatchService {
  findAll(query?: string): Promise<IResponseMessage<IMatch[]> >;
  finishMatch(id: number): Promise<IResponseMessage<string> >;
  updateInProgressMatch(
    id: number,
    body: IBodyMatchGoals,
  ): Promise<IResponseMessage<string> >
}
