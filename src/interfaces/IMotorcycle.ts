import { z } from 'zod';
import { vehileSchema } from './IVehicle';

// enum Categories {
//   Street,
//   Custom,
//   Trail,
// }

const motorcyleSchema = vehileSchema.extend({
  // category: z.nativeEnum(Categories),
  category: z.enum(['Street', 'Custom', 'Trail']),

  engineCapacity: z.number({
    required_error: 'Doors Quantity is required',
    invalid_type_error: 'Doors Quantity must be an integer',
  })
    .lte(2500, { message: 'It must be a integer less or equal to 2500' })
    .gt(0, { message: 'It must be a integer greater than 0' }),
});

type IMotorcycle = z.infer<typeof motorcyleSchema>;

export { IMotorcycle, motorcyleSchema };
