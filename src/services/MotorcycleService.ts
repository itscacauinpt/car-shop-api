import { ErrorTypes } from '../errors/errosCatalog';
import { IModel } from '../interfaces/IModel';
import { IMotorcycle, motorcyleSchema } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

export default class Motorcycle implements IService<IMotorcycle> {
  constructor(private _model: IModel<IMotorcycle>) { }

  async create(obj: unknown): Promise<IMotorcycle> {
    const parsed = motorcyleSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;

    return this._model.create(parsed.data);
  }

  async read(): Promise<IMotorcycle[]> {
    return this._model.read();
  }

  async readOne(_id: string): Promise<IMotorcycle> {
    const readOne = await this._model.readOne(_id);

    if (!readOne) throw new Error(ErrorTypes.EntityNotFound);

    return readOne;
  }

  async update(_id: string, obj: unknown): Promise<IMotorcycle> {
    const parsed = motorcyleSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;

    const updated = await this._model.update(_id, parsed.data);

    if (!updated) throw new Error(ErrorTypes.EntityNotFound);

    return updated;
  }

  async delete(_id: string): Promise<IMotorcycle | null> {
    const deleted = await this._model.delete(_id);

    if (!deleted) throw new Error(ErrorTypes.EntityNotFound);

    return deleted;
  }
}
