import { Schema, model as MongooseModel } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

const motorcyleSchema = new Schema<IMotorcycle>({
  category: Array,
  engineCapacity: Number,
}, { versionKey: false });

export default class Motorcyle extends MongoModel<IMotorcycle> {
  constructor(model = MongooseModel('Motorcycle', motorcyleSchema)) { super(model); }
}
