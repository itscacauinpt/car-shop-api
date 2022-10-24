export enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  InvalidMongoId = 'InvalidMongoId',
}

type ErrorResponseObj = {
  message: string;
  httpStts: number;
};

export type ErrorCatalog = Record<ErrorTypes, ErrorResponseObj>;

export const errorCatalog: ErrorCatalog = {
  EntityNotFound: {
    message: 'Entity not found',
    httpStts: 404,
  },
  InvalidMongoId: {
    message: 'Id must be a 24 character hexadecimal',
    httpStts: 400,
  },
};
