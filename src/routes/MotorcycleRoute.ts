import { Router } from 'express';
import MotorModel from '../models/MotorcycleModel';
import MotorService from '../services/MotorcycleService';
import MotorController from '../controllers/MotorcylceController';

const router = Router();

const model = new MotorModel();
const service = new MotorService(model);
const controller = new MotorController(service);

const endpoint = '/motorcycles';
const endpointId = '/motorcycles/:id';

router.post(endpoint, (req, res) => controller.create(req, res));
router.get(endpoint, (req, res) => controller.read(req, res));
router.get(endpointId, (req, res) => controller.readOne(req, res));
router.put(endpointId, (req, res) => controller.update(req, res));
router.delete(endpointId, (req, res) => controller.delete(req, res));

export default router;