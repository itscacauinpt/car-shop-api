import { Request, Response } from 'express';

import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;

import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import CarController from '../../../controllers/CarController';

import { carMock, carMockId, carMockUpdated } from '../../mocks/car.mocks';

describe('Testing Car Controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const request = { } as Request;
  const response = { } as Response;

  before(async () => {
    sinon.stub(carService, 'create').resolves(carMockId);
    sinon.stub(carService, 'read').resolves([carMockId]);
    sinon.stub(carService, 'readOne').resolves(carMockId);
    sinon.stub(carService, 'update').resolves(carMockUpdated);
    sinon.stub(carService, 'delete').resolves(carMockId);

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(response);
    response.end = sinon.stub().returns(response);
  });

  after(()=> sinon.restore());

  describe('Endpoint POST/cars', () => {
    it('creted with success', async () => {
      request.body = carMock;
      await carController.create(request, response);

      expect((response.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((response.json as sinon.SinonStub).calledWith(carMockId)).to.be.true;
    });
  });

  describe('Endpoint GET/cars', () => {
    it('finding all with success', async () => {
      await carController.read(request, response);

      expect((response.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((response.json as sinon.SinonStub).calledWith([carMockId])).to.be.true;
    });
  });

  describe('Endpoint GET/cars/:id', () => {
    it('finding one with success', async () => {
      request.params = { id: carMockId._id };
      await carController.readOne(request, response);

      expect((response.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((response.json as sinon.SinonStub).calledWith(carMockId)).to.be.true;
    });
  });

  describe('Endpoint PUT/cars/:id', () => {
    it('updating one with success', async () => {
      request.params = { id: carMockUpdated._id };
      await carController.update(request, response);

      expect((response.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((response.json as sinon.SinonStub).calledWith(carMockUpdated)).to.be.true;
    });
  });


  describe('Endpoint DELETE/cars/:id', () => {
    it('deleting one with success', async () => {
      request.params = { id: carMockId._id };
      await carController.delete(request, response);

      expect((response.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((response.json as sinon.SinonStub).calledWith()).to.be.true;
    });
  });

});