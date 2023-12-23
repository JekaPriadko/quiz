import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { ACCESS_TOKEN } from '../config/auth/auth.config';
import { AuthError } from '../exceptions/Errors';
import CustomRequest from '../entity/CustomRequest';

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader?.startsWith('Bearer ')) {
      throw new AuthError({
        message: 'You are unauthenticated!',
        authParams: {
          error: 'invalid_access_token',
          error_description: 'unknown authentication scheme',
        },
      });
    }

    const accessTokenParts = authHeader.split(' ');
    const aTkn = accessTokenParts[1];

    const decoded = jwt.verify(aTkn, ACCESS_TOKEN.secret);
    (req as CustomRequest).userId = (decoded as JwtPayload)._id;
    next();
  } catch (err) {
    throw new AuthError({
      message: 'Token lifetime exceeded!',
      authParams: {
        error: 'expired_access_token',
        error_description: 'access token is expired',
      },
    });
  }
};

const authCheck = {
  verifyToken,
};

export default authCheck;
