import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests Teams', () => {
    beforeEach(sinon.restore);

  it('FindAll', async () => {
   const result = await chai.request(app).get('/teams').send();
   expect(result.status).to.be.equal(200);
  });

  it('FindByID', async () => {
    const result = await chai.request(app).get('/teams/1').send();
    expect(result.status).to.be.equal(200);
   });
});