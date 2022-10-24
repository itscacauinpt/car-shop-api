import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { ErrorTypes, errorCatalog } from '../errors/errosCatalog';

const errorHandler: ErrorRequestHandler = (err: Error | ZodError, _req, res, _next) => {
  if (err instanceof ZodError) { 
    return res.status(400).json({ message: err.issues });
  }

  const messageAsErrorType = err.message as ErrorTypes;
  const mappedError = errorCatalog[messageAsErrorType];

  if (mappedError) {
    const { httpStts, message } = mappedError;
    return res.status(httpStts).json({ message });
  }

  console.error(err);
  return res.status(500).json({ message: 'Internal error' });
};

export default errorHandler;
