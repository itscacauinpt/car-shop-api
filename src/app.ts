import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import carRoutes from './routes/CarRoute';
import motorcycleRoutes from './routes/MotorcycleRoute';

import errorHandler from './middlewares/errorHandler';

import swaggerJson from '../swagger.json';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use('/terms', (_req, res) => { res.status(200).json({ message: 'Termos de Serviço' }); });

app.use('/v1', carRoutes);
app.use('/v1', motorcycleRoutes);

app.use(errorHandler);

export default app;
