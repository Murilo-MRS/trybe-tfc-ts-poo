import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { allTeams, allTeamsMockResponse } from './mocks/teams.mock';
import { Response } from 'superagent';
import Team from '../database/models/TeamModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests /teams', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, 'findAll')
      .resolves(allTeams as Team[]);
    sinon
      .stub(Team, 'findByPk')
      .onFirstCall()
      .resolves(allTeams[0] as Team)
      .onSecondCall()
      .resolves(null)
  });

  after(()=>{
    (Team.findAll as sinon.SinonStub).restore();
    (Team.findByPk as sinon.SinonStub).restore();
  })

  it('findAll retorna todos com sucesso', async function () {
    // Arrange
    // Act
    chaiHttpResponse = await chai.request(app).get('/teams').send();
    // Assertion
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(allTeamsMockResponse);
  });
  
  it('findByPk retorna time com sucesso', async function () {
    // Arrange
    // Act
    chaiHttpResponse = await chai.request(app).get('/teams/1').send();
    // Assertion
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(allTeamsMockResponse[0]);
  });
  
  it('findByPk retorna null com sucesso', async function () {
    // Arrange
    // Act
    chaiHttpResponse = await chai.request(app).get('/teams/1').send();
    // Assertion
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(null);
  });
});