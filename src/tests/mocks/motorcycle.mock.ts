import { IMotorcycle } from '../../interfaces/IMotorcycle';

export const mtrCycleWithId: IMotorcycle & { _id: string } = {
  _id: "4edd40c86762e0fb12000003",
  model: "Honda CG Titan 125",
  year: 1963,
  color: "red",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125,
}

export const mtrCycle: IMotorcycle = {
  model: "Honda CG Titan 125",
  year: 1963,
  color: "red",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125,
}

export const mtrCycleToUp: IMotorcycle = {
  model: "Honda CG Titan 125",
  year: 1963,
  color: "red",
  buyValue: 3500,
  category: "Custom",
  engineCapacity: 125,
}

export const mtrCycleUpdated: IMotorcycle & { _id: string } = {
  _id: "4edd40c86762e0fb12000003",
  model: "Honda CG Titan 125",
  year: 1963,
  color: "red",
  buyValue: 3500,
  category: "Custom",
  engineCapacity: 125,
}

export const mtrCycleWrg: IMotorcycle = {
  model: "Honda CG Titan 125",
  year: 9999,
  color: "yellow",
  buyValue: 99999999,
  category: "Street",
  engineCapacity: 125,
}
