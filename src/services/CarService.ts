import { ICar, carSchema } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';
import { IModel } from '../interfaces/IModel';

export default class Car implements IService<ICar> {
  constructor(private _model: IModel<ICar>) {}

  public async create(obj: unknown): Promise<ICar> {
    const parsed = carSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    return this._model.create(parsed.data);
  }

  public async read(): Promise<ICar[]> {
    return this._model.read();
  }
}
