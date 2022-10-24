import { isValidObjectId, Model, UpdateQuery } from 'mongoose';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  constructor(protected _model: Model<T>) {}

  async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }

  async read(): Promise<T[]> {
    return this._model.find();
  }

  async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('InvalidMongoId');

    return this._model.findOne({ _id });
  }

  async update(_id: string, obj: T): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('InvalidMongoId');

    return this._model.findByIdAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
  }

  async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('InvalidMongoId');

    return this._model.findByIdAndRemove({ _id });
  }
}

export default MongoModel;
