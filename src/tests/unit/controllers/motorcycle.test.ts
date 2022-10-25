import { Request, Response } from 'express';

import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;

import MtrModel from '../../../models/MotorcycleModel';
import MtrService from '../../../services/MotorcycleService';
import MtrController from '../../../controllers/MotorcylceController';

import { mtrCycle, mtrCycleUpdated, mtrCycleWithId } from '../../mocks/motorcycle.mock';

describe('Testing Car Controller', () => {
  const mtrModel = new MtrModel();
  const mtrService = new MtrService(mtrModel);
  const mtrController = new MtrController(mtrService);

  const request = { } as Request;
  const response = { } as Response;

  before(async () => {
    sinon.stub(mtrService, 'create').resolves(mtrCycleWithId);
    sinon.stub(mtrService, 'read').resolves([mtrCycleWithId]);
    sinon.stub(mtrService, 'readOne').resolves(mtrCycleWithId);
    sinon.stub(mtrService, 'update').resolves(mtrCycleUpdated);
    sinon.stub(mtrService, 'delete').resolves(mtrCycleWithId);

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(response);
    response.end = sinon.stub().returns(response);
  });

  after(()=> sinon.restore());

  describe('Endpoint POST/motorcycle', () => {
    it('creted with success', async () => {
      request.body = mtrCycle;
      await mtrController.create(request, response);

      expect((response.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((response.json as sinon.SinonStub).calledWith(mtrCycleWithId)).to.be.true;
    });
  });

  describe('Endpoint GET/motorcycle', () => {
    it('finding all with success', async () => {
      await mtrController.read(request, response);

      expect((response.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((response.json as sinon.SinonStub).calledWith([mtrCycleWithId])).to.be.true;
    });
  });

  describe('Endpoint GET/motorcycle/:id', () => {
    it('finding one with success', async () => {
      request.params = { id: mtrCycleWithId._id };
      await mtrController.readOne(request, response);

      expect((response.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((response.json as sinon.SinonStub).calledWith(mtrCycleWithId)).to.be.true;
    });
  });

  describe('Endpoint PUT/motorcycle/:id', () => {
    it('updating one with success', async () => {
      request.params = { id: mtrCycleUpdated._id };
      await mtrController.update(request, response);

      expect((response.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((response.json as sinon.SinonStub).calledWith(mtrCycleUpdated)).to.be.true;
    });
  });

  describe('Endpoint DELETE/motorcycle/:id', () => {
    it('deleting one with success', async () => {
      request.params = { id: mtrCycleWithId._id };
      await mtrController.delete(request, response);

      expect((response.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((response.json as sinon.SinonStub).calledWith()).to.be.true;
    });
  });

});
