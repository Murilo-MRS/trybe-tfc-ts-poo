import IMatch from '../interfaces/IMatch';
import ILeaderBoard from '../interfaces/ILeaderBoard';

class Calculators {
  constructor(private _board: ILeaderBoard[], private _finishedMatches: IMatch[]) {}

  private static calcBoard(team: ILeaderBoard) {
    const pts = (3 * team.totalVictories) + (1 * team.totalDraws);

    return pts;
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
      const pts = Calculators.calcBoard(homeTeam);

      homeTeam.totalPoints = pts;
      homeTeam.totalGames += 1;
      homeTeam.goalsFavor += data.homeTeamGoals;
      homeTeam.goalsOwn += data.awayTeamGoals;
      const parseEfficiency = ((homeTeam.totalPoints / (homeTeam.totalGames * 3)) * 100).toFixed(2);
      homeTeam.goalsBalance = homeTeam.goalsFavor - homeTeam.goalsOwn;
      homeTeam.efficiency = parseFloat(parseEfficiency);
    });
    return this._board;
  }

  public calculateAwayResults() {
    this._finishedMatches.forEach((data) => {
      const awayTeam = this._board
        .find((e) => data.awayTeam?.teamName === e.name) as ILeaderBoard;
      if (data.awayTeamGoals < data.homeTeamGoals) {
        awayTeam.totalLosses += 1;
      } else if (data.awayTeamGoals === data.homeTeamGoals) {
        awayTeam.totalDraws += 1;
      } else { awayTeam.totalVictories += 1; }
      const pts = Calculators.calcBoard(awayTeam);

      awayTeam.totalPoints = pts;
      awayTeam.totalGames += 1;
      awayTeam.goalsFavor += data.awayTeamGoals;
      awayTeam.goalsOwn += data.homeTeamGoals;
      const parseEfficiency = ((awayTeam.totalPoints / (awayTeam.totalGames * 3)) * 100).toFixed(2);
      awayTeam.goalsBalance = awayTeam.goalsFavor - awayTeam.goalsOwn;
      awayTeam.efficiency = parseFloat(parseEfficiency);
    });
    return this._board;
  }
}

export default Calculators;
