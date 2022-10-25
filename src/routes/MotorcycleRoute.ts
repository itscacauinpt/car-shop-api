import { Router } from 'express';
import MotorModel from '../models/MotorcycleModel';
import MotorService from '../services/MotorcycleService';
import MotorController from '../controllers/MotorcylceController';

const router = Router();

const model = new MotorModel();
const service = new MotorService(model);
const controller = new MotorController(service);

router.post('/motorcycles', (req, res) => controller.create(req, res));

export default router;