import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import Match from '../database/models/MatchModel';
import { allMatches, allMatchesResponse, invalidId, invalidSameId,
  newMatchresponse, validNewMatch, validScore } from './mocks/matches.mock';
import { mockToken } from './mocks/users.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests /matches', () => {
  let chaiHttpResponse: Response;

  describe('GET retorna todas as partidas', () => {
    before(async () => {
      sinon
        .stub(Match, 'findAll')
        .onFirstCall()
        .resolves(allMatches as Match[])
        .onSecondCall()
        .resolves([allMatches[1]] as Match[])
        .onThirdCall()
        .resolves([allMatches[0]] as Match[]);
    })

    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    })
    
    it('com sucesso', async function () {
      // Arrange
      // Act
      chaiHttpResponse = await chai.request(app).get('/matches');
      // Assertion
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(allMatches);
    });

    it('em progresso com sucesso', async function () {
      // Arrange
      // Act
      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');
      // Assertion
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal([allMatches[1]]);
    });

    it('finalizadas com sucesso', async function () {
      // Arrange
      // Act
      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');
      // Assertion
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal([allMatches[0]]);
    });
  })
  describe('PATCH atualiza', () => {
    before(async () => {
      sinon
        .stub(Match, 'update')
        .resolves([1]);
    })

    after(() => {
      (Match.update as sinon.SinonStub).restore();
    })

    it('placar com sucesso', async function () {
      // Arrange
      // Act
      chaiHttpResponse = await chai.request(app).patch('/matches/1')
      .send(validScore)
      .set('authorization', mockToken);
      // Assertion
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal({
        message: "Goals Updated!"
      });
    });

    it('finaliza progresso com sucesso', async function () {
      // Arrange
      // Act
      chaiHttpResponse = await chai.request(app).patch('/matches/1/finish')
      .set('authorization', mockToken);
      // Assertion
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal({
        message: "Finished"
      });
    });
  })
  describe('POST cria partida', () => {
    before(async () => {
      sinon
        .stub(Match, 'create')
        .resolves(newMatchresponse as Match);
    })

    after(() => {
      (Match.create as sinon.SinonStub).restore();
    })

  it('com sucesso', async function () {
    // Arrange
    // Act
    chaiHttpResponse = await chai.request(app).post('/matches')
    .send(validNewMatch)
    .set('authorization', mockToken);
    // Assertion
    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.be.deep.equal(newMatchresponse);
  });

  it('com ids de times inválidos retorna erro', async function () {
    // Arrange
    // Act
    chaiHttpResponse = await chai.request(app).post('/matches')
    .send(invalidId)
    .set('authorization', mockToken);
    // Assertion
    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      message: "There is no team with such id!"
    });
  });

  it('com ids de times iguais retorna erro', async function () {
    // Arrange
    // Act
    chaiHttpResponse = await chai.request(app).post('/matches')
    .send(invalidSameId)
    .set('authorization', mockToken);
    // Assertion
    expect(chaiHttpResponse.status).to.be.equal(422);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      message: "It is not possible to create a match with two equal teams"
    });
  });
  })
});