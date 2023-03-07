import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests leaderboard', () => {
  let chaiHttpResponse: Response;

    // before(async () => {
    //   sinon
    //     .stub(User, 'findOne')
    //     .resolves(userLoginMock as User);
    // });

    // after(()=>{
    //   (User.findOne as sinon.SinonStub).restore();
    // })

    it('/leaderboard retorna tabela home/away com sucesso', async function () {
      // Arrange
      // Act
      chaiHttpResponse = await chai.request(app).get('/leaderboard');
      // Assertion
      expect(chaiHttpResponse.status).to.be.equal(200);
    });

    it('/leaderboard/home retorna tabela dos resultados home com sucesso', async function () {
      // Arrange
      // Act
      chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
      // Assertion
      expect(chaiHttpResponse.status).to.be.equal(200);
    });

    it('/leaderboard/away retorna tabela dos resultados away com sucesso', async function () {
      // Arrange
      // Act
      chaiHttpResponse = await chai.request(app).get('/leaderboard/away');
      // Assertion
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
});