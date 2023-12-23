import { Response } from 'express';

import BaseError from './Errors/BaseError';
import { AuthError, ValidationError } from './Errors';
import HttpCode from '../entity/HttpCode';

class ErrorHandler {
  private isTrustedError(error: Error): boolean {
    return error instanceof BaseError && error.isOperational;
  }

  private isAuthError(error: Error): boolean {
    return error instanceof AuthError;
  }

  private isValidationError(error: Error): boolean {
    return error instanceof ValidationError;
  }

  public handleError(error: Error | BaseError, res?: Response): void {
    if (this.isAuthError(error) && res) {
      res.set((error as AuthError).authHeaders);
    }

    if (this.isTrustedError(error) && res) {
      this.handleTrustedError(error as BaseError, res);
    } else {
      this.handleCriticalError(res);
    }
  }

  private handleTrustedError(error: BaseError, res: Response): void {
    const data: { message: string; name: string; payload?: object } = {
      message: error.message,
      name: error.name,
    };

    if (error.payload) {
      data.payload = error.payload;
    }

    res.status(error.httpCode).json(data);
  }

  private handleCriticalError(res?: Response): void {
    if (res) {
      res
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }

    console.log('Application encountered a critical error. Exiting');
    process.exit(1);
  }
}

const errorHandler = new ErrorHandler();

export default errorHandler;
