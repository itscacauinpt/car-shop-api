import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;

import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/errosCatalog';

import MtrModel from '../../../models/MotorcycleModel';
import MtrService from '../../../services/MotorcycleService';

import { mtrCycle, mtrCycleToUp, mtrCycleUpdated, mtrCycleWithId, mtrCycleWrg } from '../../mocks/motorcycle.mock';

describe('Testing Motorcycle Service', () => {
  const mtrModel = new MtrModel();
  const mtrService = new MtrService(mtrModel);

  before(async () => {
    sinon.stub(mtrModel, 'create').resolves(mtrCycleWithId);

    sinon.stub(mtrModel, 'read').resolves([mtrCycleWithId]);

    sinon.stub(mtrModel, 'readOne')
      .onCall(0).resolves(mtrCycleWithId)
      .onCall(1).resolves(null);
    
    sinon.stub(mtrModel, 'update')
			.onCall(0).resolves(mtrCycleUpdated)
			.onCall(1).resolves(null);

    sinon.stub(mtrModel, 'delete')
			.onCall(0).resolves(mtrCycleWithId)
			.onCall(1).resolves(null);
  });

  after(() => sinon.restore());

  describe('Endpoint POST/motorcycle', () => {
    it('creating with success', async () => {
      expect(await mtrService.create(mtrCycle)).to.be.deep.equal(mtrCycleWithId)
    });
    it('trying to create with empty body', async () => {
			let error;
			try {
        await mtrService.create({})
      } catch (err) {
        error = err
      }

			expect(error).to.be.instanceOf(ZodError);
		});
  });

  describe('Endpoint GET/motorcycle', () => {
    it('finding all with success', async () => {
      expect(await mtrService.read()).to.be.deep.equal([mtrCycleWithId])
    });
  });

  describe('Endpoint GET/motorcycle/:id', () => {
    it('finding one with success', async () => {
      expect(await mtrService.readOne(mtrCycleWithId._id)).to.be.deep.equal(mtrCycleWithId);
    });
    it('forcing error on one call: EntityNotFound', async () => {
      let error;
      try {
        await mtrService.readOne('entityNotExist')
      } catch (err:any) {
        error = err
      };
  
      expect(error?.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});
  });


  describe('Endpoint PUT/motorcycle/:id', () => {
		it('updating one with success', async () => {
      expect(await mtrService.update(mtrCycleUpdated._id, mtrCycleToUp)).to.be.deep.equal(mtrCycleUpdated)
    });
		it('forcing error on one call: entityDoNotExists', async () => {
			let error;
			try {
        await mtrService.update('entityDoNotExists', mtrCycle)
      } catch (err: any) {
        error = err;
      }

      expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
		});

		it('forcing error on one call: Zod error', async () => {
			let error;
			try {
        await mtrService.update(mtrCycleWithId._id, mtrCycleWrg)
      } catch (err: any) {
        error = err;
      }

			expect(error).to.be.instanceOf(ZodError);
		});
	});


  describe('Endpoint DELETE/motorcycle/:id', () => {
    it('deleting with success', async () => {
      expect(await mtrService.delete(mtrCycleWithId._id)).to.be.deep.equal(mtrCycleWithId)
    });
    it('forcing error on one call: Entity not found', async () => {
      try {
        await mtrService.delete('entityNotExist');
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
      }
    })
  })
});
