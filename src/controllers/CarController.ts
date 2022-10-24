import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

export default class Car {
  constructor(private _service: IService<ICar>) {}

  async create(req: Request, res: Response) {
    const created = await this._service.create(req.body);

    return res.status(201).json(created);
  }

  async read(_req: Request, res: Response<ICar[]>) {
    const readAll = await this._service.read();

    return res.status(200).json(readAll);
  }

  async readOne(req: Request, res: Response<ICar>) {
    const readOne = await this._service.readOne(req.params.id);

    return res.status(200).json(readOne);
  }

  async update(req: Request, res: Response<ICar>) {
    const updated = await this._service.update(req.params.id, req.body);

    return res.status(200).json(updated);
  }

  async delete(req: Request, res: Response<null>) {
    await this._service.delete(req.params.id);

    return res.status(204).end();
  }
}
