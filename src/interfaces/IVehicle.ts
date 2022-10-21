import { z } from 'zod';

const vehileSchema = z.object({
  model: z.string({
    required_error: 'Model is required',
    invalid_type_error: 'Model must be a string',
  }).min(3, { message: 'Model must be 3 or more characters long' }),

  year: z.number({
    required_error: 'Year is required',
    invalid_type_error: 'Year must be an integer',
  }).int()
    .min(1900, { message: 'Year must be greater or equal to 1900' })
    .max(2022, { message: 'Year must be less or equal to 2022' }),

  color: z.string({
    required_error: 'Color is required',
    invalid_type_error: 'Color must be a string',
  }).min(3, { message: 'Color must be 3 or more characters long' }),

  status: z.boolean({
    required_error: 'Status is required',
    invalid_type_error: 'Status must be boolean',
  }).optional(),

  buyValue: z.number({
    invalid_type_error: 'Buy Value must be an integer',
  }).int(),
});

type IVehicle = z.infer<typeof vehileSchema>;

export { vehileSchema, IVehicle };
