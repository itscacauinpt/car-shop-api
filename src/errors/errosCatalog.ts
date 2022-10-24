export enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  InvalidMongoId = 'InvalidMongoId',
}

type ErrorResponseObj = {
  // message: string;
  error: string;
  httpStts: number;
};

export type ErrorCatalog = Record<ErrorTypes, ErrorResponseObj>;

export const errorCatalog: ErrorCatalog = {
  EntityNotFound: {
    // message: 'Entity not found',
    error: 'Object not found',
    httpStts: 404,
  },
  InvalidMongoId: {
    // message: 'Id must be a 24 character hexadecimal',
    error: 'Id must have 24 hexadecimal characters',
    httpStts: 400,
  },
};
