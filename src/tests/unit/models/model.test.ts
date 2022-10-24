import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;

import { Model } from 'mongoose';
import CarModel from '../../../models/CarModel';

import { ErrorTypes } from '../../../errors/errosCatalog';
import { carMock, carMockId, carMockUpdated, carMockToUp } from '../../mocks/car.mocks';

describe('Testing Car Model', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockId);
    sinon.stub(Model, 'find').resolves([carMockId]);
    sinon.stub(Model,'findOne').resolves(carMockId);
    sinon.stub(Model, 'findByIdAndRemove').resolves(carMockId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockUpdated);
  });

  after(()=> { sinon.restore() })

  describe('Endpoint POST/cars', () => {
    it('creating with success', async () => expect(await carModel.create(carMock)).to.be.deep.equal(carMockId));
  });

  describe('Endpoint GET/cars', () => {
    it('finding all with success', async () => expect(await carModel.read()).to.be.deep.equal([carMockId]));
  });

  describe('Endpoint GET/cars/:id', () => {
    it('finding one with success', async () => expect(await carModel.readOne(carMockId._id)).to.be.deep.equal(carMockId));
    it('_id not found', async () => {
			try {
				await carModel.readOne('wrongid');
			} catch (error: any) {
				expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
			}
		});
  });

  describe('Endpoint PUT/cars/:id', () => {
    it('updating one with success', async () => expect(await carModel.update(carMockId._id, carMockToUp)).to.be.deep.equal(carMockUpdated));
    it('_id not found', async () => {
			try {
				await carModel.update('wrongid', carMockToUp);
			} catch (error: any) {
				expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
			}
		});
  });

  describe('Endpoint DELETE/cars/:id', () => {
    it('deleting one with success', async () => expect(await carModel.delete(carMockId._id)).to.be.deep.equal(carMockId));
    it('_id not found', async () => {
			try {
				await carModel.delete('wrongid');
			} catch (error: any) {
				expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
			}
		});
  });
});