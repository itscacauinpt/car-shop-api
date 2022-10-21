import { z } from 'zod';
import { vehileSchema } from './IVehicle';

const carSchema = vehileSchema.extend({
  doorsQty: z.number({
    required_error: 'Doors Quantity is required',
    invalid_type_error: 'Doors Quantity must be an integer',
  }).int()
    .gte(2, { message: 'It must be greater or equal to 2' })
    .lte(4, { message: 'It must be less or equal to 4' }),

  seatsQty: z.number({
    required_error: 'Seats Quantity is required',
    invalid_type_error: 'Seats Quantity must be an integer',
  }).int()
    .gte(2, { message: 'It must be greater or equal to 2' })
    .lte(7, { message: 'It must be less or equal to 7' }),
});

type ICar = z.infer<typeof carSchema>;

export { carSchema, ICar };
