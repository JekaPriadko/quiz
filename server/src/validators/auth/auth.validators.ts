import { Request, Response, NextFunction } from 'express';
import { JSONSchemaType } from 'ajv';

import ajValidator from '../instance';
import { UserModel } from '../../models';
import HttpCode from '../../entity/HttpCode';
import { ValidationError, AppError } from '../../exceptions/Errors';
import { SignInRequest, SignUpRequest } from './types';

const validationSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validator = ajValidator();

    const schema: JSONSchemaType<SignInRequest> = {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email',
        },
        password: {
          type: 'string',
          format: 'password',
        },
      },
      required: ['email', 'password'],
      additionalProperties: false,
    };

    const validate = validator.compile(schema);

    if (!validate(req.body)) {
      throw new ValidationError({
        message: 'Validation failed',
        httpCode: HttpCode.BAD_REQUEST,
        violations: validate.errors ?? null,
      });
    }

    next();
  } catch (err) {
    next(err);
  }
};

const validationSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validator = ajValidator();
    validator.addFormat('password', /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/);

    const schema: JSONSchemaType<SignUpRequest> = {
      type: 'object',
      properties: {
        username: { type: 'string', minLength: 2 },
        email: {
          type: 'string',
          format: 'email',
        },
        password: {
          type: 'string',
          format: 'password',
        },
      },
      required: ['username', 'email', 'password'],
      additionalProperties: false,
    };

    const validate = validator.compile(schema);

    if (!validate(req.body)) {
      throw new ValidationError({
        message: 'Validation failed',
        httpCode: HttpCode.BAD_REQUEST,
        violations: validate.errors ?? null,
      });
    }

    next();
  } catch (err) {
    next(err);
  }
};

const checkDuplicateUsernameOrEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userByUsername = await UserModel.findOne({
      username: req.body.username,
    });

    if (userByUsername) {
      throw new AppError({
        message: 'User exist',
        httpCode: HttpCode.BAD_REQUEST,
      });
    }
    const userByEmail = await UserModel.findOne({
      email: req.body.email,
    });

    if (userByEmail) {
      throw new AppError({
        message: 'Email exist',
        httpCode: HttpCode.BAD_REQUEST,
      });
    }

    next();
  } catch (err) {
    next(err);
  }
};

const AuthValidator = {
  validationSignIn,
  validationSignUp,
  checkDuplicateUsernameOrEmail,
};

export default AuthValidator;
