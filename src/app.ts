import express from 'express';
import 'express-async-errors';
// import swaggerUi from 'swagger-ui-express'

import carRoutes from './routes/CarRoute';
import motorcycleRoutes from './routes/MotorcycleRoute';

import errorHandler from './middlewares/errorHandler';

// const swaggerFile = require('./swagger.json');

const app = express();

app.use(express.json());
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(carRoutes);
app.use(motorcycleRoutes);

app.use(errorHandler);

export default app;
