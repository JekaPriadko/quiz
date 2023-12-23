import { Schema, model } from 'mongoose';
import { createHmac } from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../config/auth/auth.config';
import { IUser, IUserModel, IUserMethods } from './entity';
import RoleModel from '../role/role.model';
import { Roles } from '../role/entity';
import HttpCode from '../../entity/HttpCode';
import { AppError } from '../../exceptions/Errors';

/* CREATE USER SCHEMA */
const UserSchema = new Schema<IUser, IUserModel, IUserMethods>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: { required: true, type: String },
    },
  ],
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Role',
    },
  ],
});

/* ATTACH MIDDLEWARE */
UserSchema.pre('save', async function modifyPassword(next) {
  try {
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  } catch (error) {
    throw new AppError({
      httpCode: HttpCode.INTERNAL_SERVER_ERROR,
      message: 'Cannot save modified password user!',
    });
  }

  next();
});

UserSchema.pre('save', async function checkRoles(next) {
  if (this.roles.length === 0) {
    const role = await RoleModel.findOne({
      name: Roles.UserRole,
    });

    if (!role) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        message: 'Cannot create user!',
      });
    }

    this.roles.push(role._id);
  }

  next();
});

/* ATTACH CUSTOM INSTANCE METHODS */
UserSchema.method('generateAcessToken', async function generateAcessToken() {
  // Create signed access token
  const accessToken: string = jwt.sign(
    {
      _id: this._id.toString(),
      username: this.username,
      email: this.email,
    },
    ACCESS_TOKEN.secret,
    {
      expiresIn: ACCESS_TOKEN.jwtExpiration,
    },
  );

  return accessToken;
});

UserSchema.method(
  'generateRefreshToken',
  async function generateRefreshToken() {
    // Create signed access token
    const refreshToken: string = jwt.sign(
      {
        _id: this._id.toString(),
      },
      REFRESH_TOKEN.secret,
      {
        expiresIn: REFRESH_TOKEN.jwtExpiration,
      },
    );

    // Create a 'refresh token hash' from 'refresh token'
    const rTknHash = createHmac('sha256', REFRESH_TOKEN.secret)
      .update(refreshToken)
      .digest('hex');

    // Save 'refresh token hash' to database
    this.tokens.push({ token: rTknHash });
    await this.save();

    return refreshToken;
  },
);

/* ATTACH CUSTOM STATIC METHODS */
UserSchema.static(
  'findByCredentials',
  async (email: string, password: string) => {
    // eslint-disable-next-line
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new AppError({
        message: 'Wrong credentials!',
        httpCode: HttpCode.BAD_REQUEST,
      });
    }

    const passwdMatch = await bcrypt.compare(password, user.password);
    if (!passwdMatch) {
      throw new AppError({
        message: 'Wrong credentials!',
        httpCode: HttpCode.BAD_REQUEST,
      });
    }

    return user;
  },
);

/* EXPORT MODEL */
const UserModel = model<IUser, IUserModel>('User', UserSchema);

export default UserModel;
