import { BaseErrorArgs } from './entity';
import BaseError from './BaseError';
import HttpCode from '../../entity/HttpCode';

class AppError extends BaseError {
  constructor(args: BaseErrorArgs) {
    super(args);

    this.name = args.name || 'AppError';
    this.httpCode = args.httpCode || HttpCode.INTERNAL_SERVER_ERROR;
  }
}

export default AppError;
