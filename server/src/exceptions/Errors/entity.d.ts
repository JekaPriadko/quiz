import { ErrorObject } from 'ajv';

export interface BaseErrorArgs {
  message: string;
  name?: string;
  httpCode?: HttpCode;
  isOperational?: boolean;
  payload?: object | null;
}

export interface AuthErrorArgs extends BaseErrorArgs {
  authParams: Record<string, string>;
}

export interface ValidationErrorArgs extends BaseErrorArgs {
  violations: ErrorObject[] | null;
}
