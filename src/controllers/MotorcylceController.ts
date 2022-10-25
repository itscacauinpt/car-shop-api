import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

export default class Motorcycle {
  constructor(private _service: IService<IMotorcycle>) {}

  async create(req: Request, res: Response) {
    const created = await this._service.create(req.body);

    return res.status(201).json(created);
  }
}