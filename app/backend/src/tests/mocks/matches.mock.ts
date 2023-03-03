import Match from "../../database/models/MatchModel";

export const allMatches = [
  {dataValues: {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      dataValues: {teamName: "São Paulo"}
    },
    awayTeam: {
      dataValues: {teamName: "Grêmio"}
    }
  }},
  {dataValues: {
    id: 48,
    homeTeamId: 13,
    homeTeamGoals: 1,
    awayTeamId: 2,
    awayTeamGoals: 1,
    inProgress: true,
    homeTeam: {
      dataValues: {teamName: "Real Brasília"}
    },
    awayTeam: {
      dataValues: {teamName: "Bahia"}
    }
  }},
]

export const allMatchesResponse = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Grêmio"
    }
  },
  {
    id: 48,
    homeTeamId: 13,
    homeTeamGoals: 1,
    awayTeamId: 2,
    awayTeamGoals: 1,
    inProgress: true,
    homeTeam: {
      teamName: "Real Brasília"
    },
    awayTeam: {
      teamName: "Bahia"
    }
  },
]

export const validNewMatch = {
  homeTeamId: 4,
  awayTeamId: 9,
  homeTeamGoals: 2,
  awayTeamGoals: 1
}

export const validScore = {
  homeTeamId: 4,
  awayTeamId: 9,
  homeTeamGoals: 2,
  awayTeamGoals: 1
}

export const invalidId = {
  homeTeamId: 4,
  awayTeamId: 9999,
  homeTeamGoals: 2,
  awayTeamGoals: 1
}

export const invalidSameId = {
  homeTeamId: 4,
  awayTeamId: 4,
  homeTeamGoals: 2,
  awayTeamGoals: 1
}

export const newMatchresponse = {
  dataValues: {
    id: 49,
    homeTeamId: 4,
    awayTeamId: 9,
    homeTeamGoals: 2,
    awayTeamGoals: 1,
    inProgress: true
  }
};
