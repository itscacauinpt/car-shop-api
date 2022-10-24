import { model as MongooseModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

const carSchema = new Schema<ICar>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, { versionKey: false });

export default class Car extends MongoModel<ICar> {
  constructor(model = MongooseModel('Car', carSchema)) { super(model); }
}
