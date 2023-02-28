import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'sequelize';
import { app } from '../app';
import { allTeams } from './teams.mock';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests Teams', () => {
  let chaiHttpResponse: Response;
    afterEach(() => {
      sinon.restore();
    });

  it('findAll retorna com sucesso', async function () {
    // Arrange
    sinon.stub(Model, 'findAll').resolves(allTeams);
    // Act
    const result = await chai.request(app).get('/teams').send();
    // Assertion
    expect(result.status).to.be.equal(200);
  });
  
  it('findOne retorna com sucesso', async function () {
    // Arrange
    sinon.stub(Model, 'findOne').resolves(allTeams[0]);
    // Act
    const result = await chai.request(app).get('/teams/1').send();
    // Assertion
    expect(result.status).to.be.equal(200);
  });
});