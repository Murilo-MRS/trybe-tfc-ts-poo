import { ModelStatic } from 'sequelize';
import { ITeam } from '../interfaces/ITeam';
import Team from '../database/models/TeamModel';
import ITeamService from '../interfaces/ITeamService';

class TeamService implements ITeamService {
  private model: ModelStatic<Team> = Team;

  // public async findById(id: number): Promise<ITeam> {
  //   throw new Error('Method not implemented.');
  // }

  public async findAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }
}

export default TeamService;
