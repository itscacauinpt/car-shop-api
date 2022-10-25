import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;

import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/errosCatalog';

import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';

import { carMock, carMockId, carMockToUp, carMockUpdated, carMockWrg } from '../../mocks/car.mocks';

describe('Testing Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(carModel, 'create').resolves(carMockId);
    sinon.stub(carModel, 'read').resolves([carMockId]);

    sinon.stub(carModel, 'readOne')
			.onCall(0).resolves(carMockId)
			.onCall(1).resolves(null);

    sinon.stub(carModel, 'update')
			.onCall(0).resolves(carMockUpdated)
			.onCall(1).resolves(null);

    sinon.stub(carModel, 'delete')
			.onCall(0).resolves(carMockId)
			.onCall(1).resolves(null);
  });

  after(()=> sinon.restore());

  describe('Endpoint POST/cars', () => {
    it('creating with success', async () => {
      expect(await carService.create(carMock)).to.be.deep.equal(carMockId)
    });
    it('trying to create with empty body', async () => {
			let error;
			try {
        await carService.create({})
      } catch (err) {
        error = err
      }

			expect(error).to.be.instanceOf(ZodError);
		});
  });

  describe('Endpoint GET/cars', () => {
    it('finding all with success', async () => {
      expect(await carService.read()).to.be.deep.equal([carMockId])
    });
  });

	describe('Endpoint GET/cars/:id', () => {
		it('finding one with success', async () => {
      expect(await carService.readOne(carMockId._id)).to.be.deep.equal(carMockId)
    });
    it('forcing error on one call: Entity not found', async () => {
      let error;
      try {
        await carService.readOne('entityDoNotExist')
      } catch (err:any) {
        error = err
      };
  
      expect(error?.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});
	});

  describe('Endpoint PUT/cars/:id', () => {
		it('updating one with success', async () => {
      expect(await carService.update(carMockUpdated._id, carMockToUp)).to.be.deep.equal(carMockUpdated)
    });
		it('forcing error on one call: Entity not found', async () => {
			let error;
			try { 
        await carService.update('entityDoNotExist', carMock)
      } catch (err: any) {
        error = err;
      }

			expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
		});

		it('forcing error on one call: Zod error', async () => {
			let error;
			try {
        await carService.update(carMockId._id, carMockWrg)
      } catch (err: any) {
        error = err;
      }

			expect(error).to.be.instanceOf(ZodError);
		});
	});


  describe('Endpoint DELETE/cars/:id', () => {
    it('deleting with success', async () => {
      expect(await carService.delete(carMockId._id)).to.be.deep.equal(carMockId)
    });
    it('forcing error on one call: Entity not found', async () => {
      try {
        await carService.delete('entityNotExist');
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
      }
    })
  })
});