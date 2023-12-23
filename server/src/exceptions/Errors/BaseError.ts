import { BaseErrorArgs } from './entity';
import HttpCode from '../../entity/HttpCode';

class BaseError extends Error {
  public name: string;

  public httpCode: HttpCode;

  public isOperational: boolean = true;

  public payload: object | null;

  constructor(args: BaseErrorArgs) {
    super(args.message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = args.name || 'BaseError';
    this.httpCode = args.httpCode || HttpCode.INTERNAL_SERVER_ERROR;
    this.payload = args.payload ?? null;

    if (args.isOperational !== undefined) {
      this.isOperational = args.isOperational;
    }

    Error.captureStackTrace(this);
  }
}

export default BaseError;
