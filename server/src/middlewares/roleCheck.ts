import { Request, Response, NextFunction } from 'express';

import { UserModel, RoleModel } from '../models';
import { Roles } from '../models/role/entity';
import CustomRequest from '../entity/CustomRequest';
import { AuthError } from '../exceptions/Errors';
import HttpCode from '../entity/HttpCode';

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req as CustomRequest;

    const userByid = await UserModel.findById(userId);
    const userRole = await RoleModel.find({ _id: { $in: userByid?.roles } });

    if (!userRole || !userRole.some(role => role.name === Roles.AdminRole)) {
      throw new AuthError({
        name: 'AccountTypeError',
        message:
          'Current account type doesn`t have permission to access this feature',
        httpCode: HttpCode.FORBIDDEN,
        authParams: {
          error: 'invalid_account_type',
        },
      });
    }

    next();
  } catch (err) {
    next(err);
  }
};

const roleCheck = {
  isAdmin,
};

export default roleCheck;
