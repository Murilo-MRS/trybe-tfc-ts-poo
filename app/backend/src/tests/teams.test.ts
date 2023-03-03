import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'sequelize';
import { app } from '../app';
import { allTeams, allTeamsMockResponse } from './mocks/teams.mock';
import { Response } from 'superagent';
import Team from '../database/models/TeamModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests Teams', () => {
  let chaiHttpResponse: Response;

  // afterEach(() => {
  //   sinon.restore();
  // });

  before(async () => {
    sinon
      .stub(Team, 'findAll')
      .resolves(allTeams as Team[]);
    sinon
      .stub(Team, 'findByPk')
      .resolves(allTeams[0] as Team)
  });

  after(()=>{
    (Team.findAll as sinon.SinonStub).restore();
    (Team.findByPk as sinon.SinonStub).restore();
  })

  it('findAll retorna com sucesso', async function () {
    // Arrange
    // sinon
    //   .stub(Team, 'findAll')
    //   .resolves(allTeams);
    // Act
    chaiHttpResponse = await chai.request(app).get('/teams').send();
    // Assertion
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(allTeamsMockResponse);
  });
  
  it('findOne retorna com sucesso', async function () {
    // Arrange
    // sinon
    //   .stub(Team, 'findByPk')
    //   .resolves(mockModelTeamGetById as Team)
    // Act
    chaiHttpResponse = await chai.request(app).get('/teams/1').send();
    // Assertion
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(allTeamsMockResponse[0]);
  });
});