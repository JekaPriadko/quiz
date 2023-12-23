import { CookieOptions, NextFunction, Request, Response } from 'express';
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import { createHmac } from 'crypto';

import { REFRESH_TOKEN, COOKIE } from '../config/auth/auth.config';
import { AuthError, AppError } from '../exceptions/Errors';
import CustomRequest from '../entity/CustomRequest';
import HttpCode from '../entity/HttpCode';
import { UserModel } from '../models';
import logger from '../utils/logger';

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new UserModel({ username, email, password });

    // Save user and generate Tokens
    await newUser.save();
    const aTkn = await newUser.generateAcessToken();
    const refreshToken = await newUser.generateRefreshToken();

    // SET refresh Token cookie in response
    res.cookie(COOKIE.name, refreshToken, COOKIE.options as CookieOptions);

    // Send Response on successful Sign Up
    res.status(201).json({
      user: newUser,
      accessToken: aTkn,
    });
  } catch (err) {
    logger.error('SignUp Error: cannot create user');
    next(err);
  }
};

const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    // Custom methods on user are defined in User model
    const user = await UserModel.findByCredentials(email, password);
    const aTkn = await user.generateAcessToken();
    const refreshToken = await user.generateRefreshToken();

    // SET refresh Token cookie in response
    res.cookie(COOKIE.name, refreshToken, COOKIE.options as CookieOptions);

    // Send Response on successful Sign In
    res.json({
      user,
      accessToken: aTkn,
    });
  } catch (error) {
    next(error);
  }
};

const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { cookies } = req;
    const refreshToken = cookies[COOKIE.name];

    if (!refreshToken) {
      throw new AuthError({
        message: 'You are unauthenticated!',
        authParams: {
          realm: 'reauth',
          error: 'no_rft',
          error_description: 'Refresh Token is missing!',
        },
      });
    }

    const decodedRefreshTkn = jwt.verify(
      refreshToken,
      REFRESH_TOKEN.secret,
    ) as JwtPayload;

    const rTknHash = createHmac('sha256', REFRESH_TOKEN.secret)
      .update(refreshToken)
      .digest('hex');

    const userWithRefreshTkn = await UserModel.findOne({
      _id: decodedRefreshTkn._id,
      'tokens.token': rTknHash,
    });

    if (!userWithRefreshTkn) {
      throw new AuthError({
        message: 'You are unauthenticated!',
        authParams: {
          realm: 'reauth',
        },
      });
    }

    const newAtkn = await userWithRefreshTkn.generateAcessToken();
    res.set({ 'Cache-Control': 'no-store', Pragma: 'no-cache' });

    res.status(HttpCode.CREATED).json({
      accessToken: newAtkn,
    });
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      next(
        new AuthError({
          message: 'You are unauthenticated!',
          authParams: {
            realm: 'reauth',
            error_description: 'token error',
          },
        }),
      );
      return;
    }
    next(err);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Authenticated user ID attached on `req` by authentication middleware
    const { userId } = req as CustomRequest;
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        message: 'Cannot find user!',
      });
    }

    user.tokens = [];
    await user.save();

    // Set cookie expiry to past date to mark for destruction
    const expireCookieOptions = {
      ...COOKIE.options,
      expires: new Date(1),
    };

    // Destroy refresh token cookie
    res.cookie(COOKIE.name, '', expireCookieOptions as CookieOptions);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export { signup, signin, refreshAccessToken, logout };
