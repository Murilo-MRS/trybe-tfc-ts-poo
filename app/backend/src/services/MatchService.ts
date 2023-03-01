import { ModelStatic, Op } from 'sequelize';
import IMatchService from '../interfaces/IMatchService';
import Match from '../database/models/MatchModel';
import IMatch from '../interfaces/IMatch';
import IResponseMessage from '../interfaces/IResponseMessage';
import Team from '../database/models/TeamModel';
// import Team from '../database/models/TeamModel';

class MatchService implements IMatchService {
  private model: ModelStatic<Match> = Match;

  public async findAll(query?: string): Promise<IResponseMessage<IMatch[]> > {
    if (query === undefined) {
      const matches = await this.model.findAll({ include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ] });
      return { status: 200, message: matches };
    }

    const inProgress = query === 'true';

    const matches = await this.model.findAll({ include: [
      { model: Team, as: 'homeTeam', attributes: ['teamName'] },
      { model: Team, as: 'awayTeam', attributes: ['teamName'] },
    ],
    where: { [Op.and]: [{ inProgress }] } });

    return { status: 200, message: matches };
  }
}

export default MatchService;