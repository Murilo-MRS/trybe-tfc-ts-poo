import { ModelStatic, Op } from 'sequelize';
import Calculators from '../utils/Calculators';
import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';
import ILeaderBoardService from '../interfaces/ILeaderBoardService';
import ILeaderBoard from '../interfaces/ILeaderBoard';
import IMatch from '../interfaces/IMatch';
import { ITeam } from '../interfaces/ITeam';
import IResponseMessage from '../interfaces/IResponseMessage';

class LeaderBoardService implements ILeaderBoardService {
  private static teamModel: ModelStatic<Team> = Team;
  private _matchModel: ModelStatic<Match> = Match;

  public async getResults(path: string): Promise<IResponseMessage<ILeaderBoard[]> > {
    const finishedMatches: IMatch[] = await this._matchModel.findAll({ include: [
      { model: Team, as: 'homeTeam', attributes: ['teamName'] },
      { model: Team, as: 'awayTeam', attributes: ['teamName'] },
    ],
    where: { [Op.and]: [{ inProgress: false }] } });

    const board = await LeaderBoardService.board();
    const calculate = new Calculators(board, finishedMatches);
    const result = path.includes('home')
      ? calculate.calculateHomeResults()
      : calculate.calculateAwayResults();

    const orderedBoard = LeaderBoardService.orderBoard(result);

    return { status: 200, message: orderedBoard };
  }

  public async leaderboard(): Promise<IResponseMessage<ILeaderBoard[]> > {
    const finishedMatches: IMatch[] = await this._matchModel.findAll({ include: [
      { model: Team, as: 'homeTeam', attributes: ['teamName'] },
      { model: Team, as: 'awayTeam', attributes: ['teamName'] },
    ],
    where: { [Op.and]: [{ inProgress: false }] } });

    const board = await LeaderBoardService.board();
    const calculate = new Calculators(board, finishedMatches);
    const result = calculate.calculateResults();
    const orderedBoard = LeaderBoardService.orderBoard(result);

    return { status: 200, message: orderedBoard };
  }

  private static async board(): Promise<ILeaderBoard[]> {
    const teams: ITeam[] = await LeaderBoardService.teamModel.findAll();
    return teams.map(({ teamName }) => (
      {
        name: teamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 0,
      }
    ));
  }

  private static orderBoard(leaderBoard: ILeaderBoard[]) {
    const orderedBoard = leaderBoard.sort(
      (a, b) => b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || a.goalsOwn - b.goalsOwn,
    );
    return orderedBoard;
  }
}

export default LeaderBoardService;
