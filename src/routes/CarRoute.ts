import { Router } from 'express';
import CarController from '../controllers/CarController';
import CarModel from '../models/CarModel';
import CarService from '../services/CarService';

const router = Router();

const model = new CarModel();
const service = new CarService(model);
const controller = new CarController(service);

router.post('/cars', (req, res) => controller.create(req, res));
router.get('/cars', (req, res) => controller.read(req, res));
router.get('/cars/:id', (req, res) => controller.readOne(req, res));
router.put('/cars/:id', (req, res) => controller.update(req, res));
router.delete('/cars/:id', (req, res) => controller.delete(req, res));

export default router;