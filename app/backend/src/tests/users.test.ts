import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import User from '../database/models/UserModel';
import { mockToken, userLoginMock } from './mocks/users.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests user', () => {
  describe('rota /login', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(User, 'findOne')
        .resolves(userLoginMock as User);
    });

    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('com valores válidos faz login com sucesso', async function () {
      // Arrange
      // Act
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: "admin@admin.com",
        password: "secret_admin"
      });
      // Assertion
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.have.property('token');
    });

    it('com usuário inexistente retorna erro', async function () {
      // Arrange
      // Act
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: "teste@teste.com",
        password: "secret_teste"
      });
      // Assertion
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' });
    });

    it('com senha incorreta retorna erro', async function () {
      // Arrange
      // Act
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: "admin@admin.com",
        password: "secret_secret"
      });
      // Assertion
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' });
    });

    it('email inválido retorna erro', async function () {
      // Arrange
      // Act
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: "adminadmin.com",
        password: "secret_secret"
      });
      // Assertion
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' });
    });

    it('email vazio retorna erro', async function () {
      // Arrange
      // Act
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: "",
        password: "secret_secret"
      });
      // Assertion
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
    });
  });
  describe('rota /login/role', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(User, 'findOne')
        .resolves(userLoginMock as User);
    });

    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('retorna role com sucesso"', async () => {
      // Arrange
      // Act
      const chaiHttpResponse = await chai.request(app).get('/login/role').set('authorization', mockToken).send()
      // Assertion
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal({ role: 'admin' });
    });

    it('campo sem header "authorization"', async () => {
      // Arrange
      // Act
      const chaiHttpResponse = await chai.request(app).get('/login/role').set('zxc', mockToken).send()
      // Assertion
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token not found' });
    });

    it('token inválido', async () => {
      // Arrange
      // Act
      const chaiHttpResponse = await chai.request(app).get('/login/role').set('authorization', 'mockToken').send()
      // Assertion
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token must be a valid token' });
    });
  });
});
