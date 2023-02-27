import Team from '../database/models/TeamModel';

export const allTeams : Team[] = [
  new Team({
    id: 1,
    teamName: "Avaí/Kindermann"
  }),
  new Team({
    id: 2,
    teamName: "Bahia"
  }),
  new Team({
    id: 3,
    teamName: "Botafogo"
  }),
]