import { ModelStatic, Op } from 'sequelize';
import AppError from '../errors/AppError';
import IMatchService from '../interfaces/IMatchService';
import Match from '../../database/models/MatchModel';
import IMatch from '../interfaces/IMatch';
import IResponseMessage from '../interfaces/IResponseMessage';
import Team from '../../database/models/TeamModel';
import IBodyMatchGoals from '../interfaces/IBodyMatchGoals';

class MatchService implements IMatchService {
  private model: ModelStatic<Match> = Match;
  private teamModel: ModelStatic<Team> = Team;

  public async findAll(query?: string): Promise<IResponseMessage<IMatch[]> > {
    if (query === undefined) {
      const matches = await this.model.findAll({ include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
      });
      // const format = matches.map((el) => el.get({ plain: true }));

      return { status: 200, message: matches };
    }

    const inProgress = query === 'true';

    const matches = await this.model.findAll({ include: [
      { model: Team, as: 'homeTeam', attributes: ['teamName'] },
      { model: Team, as: 'awayTeam', attributes: ['teamName'] },
    ],
    where: { [Op.and]: [{ inProgress }] },
    });

    return { status: 200, message: matches };
  }

  public async finishMatch(id: number): Promise<IResponseMessage<string> > {
    await this.model.update({ inProgress: false }, {
      where: {
        id,
      },
    });

    return { status: 200, message: 'Finished' };
  }

  public async updateInProgressMatch(
    id: number,
    { homeTeamGoals, awayTeamGoals }: IBodyMatchGoals,
  ): Promise<IResponseMessage<string> > {
    await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );

    return { status: 200, message: 'Goals Updated!' };
  }

  public async createMatch(body: IMatch): Promise<IResponseMessage<IMatch> > {
    const { homeTeamId, awayTeamId } = body;
    const teamOne = await this.teamModel.findByPk(homeTeamId);
    const teamTwo = await this.teamModel.findByPk(awayTeamId);

    if (!teamOne || !teamTwo) throw new AppError(404, 'There is no team with such id!');

    if (homeTeamId === awayTeamId) {
      throw new AppError(422, 'It is not possible to create a match with two equal teams');
    }

    const newMatch = await this.model.create({ ...body, inProgress: true });
    return { status: 201, message: newMatch };
  }
}

export default MatchService;
