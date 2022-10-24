import { Router } from 'express';
import CarController from '../controllers/CarController';
import CarModel from '../models/CarModel';
import CarService from '../services/CarService';

const router = Router();

const model = new CarModel();
const service = new CarService(model);
const controller = new CarController(service);

router.post('/cars', (req, res) => controller.create(req, res));

export default router;