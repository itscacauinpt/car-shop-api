import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;

import { Model } from 'mongoose';
import MtrCycleModel from '../../../models/MotorcycleModel';

import { ErrorTypes } from '../../../errors/errosCatalog';
import { mtrCycle, mtrCycleToUp, mtrCycleUpdated, mtrCycleWithId, mtrCycleWrg } from '../../mocks/motorcycle.mock';

describe('Testing Motorcycle Model', () => {

  const mtrCycleModel = new MtrCycleModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(mtrCycleWithId);
    sinon.stub(Model, 'find').resolves([mtrCycleWithId]);
    sinon.stub(Model, 'findOne').resolves(mtrCycleWithId);
    sinon.stub(Model, 'findByIdAndRemove').resolves(mtrCycleWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(mtrCycleUpdated);
  });

  after(() => sinon.restore());

  describe('Endpoint POST/motorcycle', () => {
    it('creating with success', async () => {
      expect(await mtrCycleModel.create(mtrCycle)).to.be.deep.equal(mtrCycleWithId);
    });
  });

  describe('Endpoint GET/motorcycle', () => {
    it('found with success', async () => {
      expect(await mtrCycleModel.read()).to.be.deep.equal([mtrCycleWithId]);
    });
  });

  describe('Endpoint GET/motorcycle/:id', () => {
    it('finding one with success', async () => {
      expect(await mtrCycleModel.readOne(mtrCycleWithId._id)).to.be.deep.equal(mtrCycleWithId);
    });
    it('_id not found', async () => {
			try {
				await mtrCycleModel.readOne('wrongid');
			} catch (error: any) {
				expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
			}
		});
  });

  describe('Endpoint PUT/motorcycle/:id', () => {
    it('updating with success', async () => {
      expect(await mtrCycleModel.update(mtrCycleUpdated._id, mtrCycleToUp)).to.be.deep.equal(mtrCycleUpdated);
    });
    it('_id not found', async () => {
			try {
				await mtrCycleModel.update('wrongid', mtrCycleToUp);
			} catch (error: any) {
				expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
			}
		});
  });

  describe('Endpoint DELETE/motorcycle/:id', () => {
    it('deleting with success', async () => {
      expect(await mtrCycleModel.delete(mtrCycleWithId._id)).to.be.deep.equal(mtrCycleWithId);
    });
    it('_id not found', async () => {
			try {
				await mtrCycleModel.delete('wrongid');
			} catch (error: any) {
				expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
			}
		});
  });

});
