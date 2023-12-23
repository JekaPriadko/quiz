import { Model, Types, HydratedDocument } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  password: string;
  tokens: { token: string }[];
  roles: Types.ObjectId[];
}

// eslint-disable-next-line
interface IUserModel extends Model<IUser, {}, IUserMethods> {
  findByCredentials(
    email: string,
    password: string,
  ): Promise<HydratedDocument<IUser, IUserMethods>>;
}

export interface IUserMethods {
  generateAcessToken(): Promise<string>;
  generateRefreshToken(): Promise<string>;
}
