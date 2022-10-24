import { ICar } from '../../interfaces/ICar';

export const carMock: ICar = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2,
};

export const carMockId: ICar & { _id: string } = {
  _id: "4edd40c86762e0fb12000003",
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  status: true,
  seatsQty: 2,
  doorsQty: 2,
}

export const carMockToUp: ICar = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "yellow",
  buyValue: 3500000,
  status: true,
  seatsQty: 2,
  doorsQty: 2,
};

export const carMockUpdated: ICar & { _id: string } = {
  _id: "4edd40c86762e0fb12000003",
  model: "Ferrari Maranello",
  year: 1963,
  color: "yellow",
  buyValue: 3500000,
  status: true,
  seatsQty: 2,
  doorsQty: 2,
}

export const carMockWrg: ICar = {
  model: 'Wrong',
  year: 9999,
  color: 'black',
  status: true,
  buyValue: 9999999,
  doorsQty: 4,
  seatsQty: 4,
}
