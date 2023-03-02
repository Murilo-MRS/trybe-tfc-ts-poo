import IMatch from '../interfaces/IMatch';
import ILeaderBoard from '../interfaces/ILeaderBoard';

class Calculators {
  constructor(private _board: ILeaderBoard[], private _finishedMatches: IMatch[]) {}

  public static calcBoard(team: ILeaderBoard) {
    const pts = (3 * team.totalVictories) + (1 * team.totalDraws);
    const effString = ((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2);
    const eff = parseFloat(effString);
    const goalsDiff = team.goalsFavor - team.goalsOwn;

    return { pts, eff, goalsDiff };
  }

  public calculateHomeResults() {
    this._finishedMatches.forEach((data) => {
      const homeTeam = this._board
        .find((e) => data.homeTeam?.teamName === e.name) as ILeaderBoard;
      if (data.homeTeamGoals < data.awayTeamGoals) {
        homeTeam.totalLosses += 1;
      } else if (data.homeTeamGoals === data.awayTeamGoals) {
        homeTeam.totalDraws += 1;
      } else { homeTeam.totalVictories += 1; }
      const { pts, eff, goalsDiff } = Calculators.calcBoard(homeTeam as ILeaderBoard);

      homeTeam.totalPoints = pts;
      homeTeam.totalGames += 1;
      homeTeam.goalsFavor += data.homeTeamGoals;
      homeTeam.goalsOwn += data.awayTeamGoals;
      homeTeam.goalsBalance = goalsDiff;
      homeTeam.efficiency = eff;
    });
    return this._board;
  }
}

export default Calculators;
