import express from 'express';
import 'express-async-errors';

import carRoutes from './routes/CarRoute';
import motorcycleRoutes from './routes/MotorcycleRoute';

import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(express.json());

app.use(carRoutes);
app.use(motorcycleRoutes);

app.use(errorHandler);

export default app;
