import { ValidationErrorArgs } from './entity';
import BaseError from './BaseError';
import HttpCode from '../../entity/HttpCode';

class ValidationError extends BaseError {
  constructor(args: ValidationErrorArgs) {
    super(args);

    this.name = args.name || 'ValidationError';
    this.httpCode = args.httpCode || HttpCode.BAD_REQUEST;

    this.payload = args.violations
      ? {
          violations: args.violations,
        }
      : null;
  }
}

export default ValidationError;
