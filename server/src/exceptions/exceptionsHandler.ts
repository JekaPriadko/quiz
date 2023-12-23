import { Request, Response, NextFunction } from 'express';
import ErrorsHandler from './errorsHandler';
import HttpCode from '../entity/HttpCode';

// 404 Error Handler
const lostErrorHandler = (req: Request, res: Response) => {
  res.status(HttpCode.NOT_FOUND).send({ message: 'Resource not found' });
};

const appErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction, // eslint-disable-line
) => {
  ErrorsHandler.handleError(err, res);
};

export { lostErrorHandler, appErrorHandler };
