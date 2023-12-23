import { AuthErrorArgs } from './entity';
import BaseError from './BaseError';
import HttpCode from '../../entity/HttpCode';

class AuthError extends BaseError {
  public readonly authParams: Record<string, string>;

  public readonly authHeaders: Record<'WWW-Authenticate', string>;

  constructor(args: AuthErrorArgs) {
    super(args);
    this.name = args.name || 'AuthError';
    this.httpCode = args.httpCode || HttpCode.UNAUTHORIZED;

    this.authParams = args.authParams || {};
    this.authHeaders = {
      'WWW-Authenticate': `Bearer ${this.stringifyAuthParams()}`,
    };
  }

  // Private Method to convert object `key: value` to string `key=value`
  private stringifyAuthParams(): string {
    const { realm, ...others } = this.authParams;
    const sanitizedRealm = realm ?? 'apps';
    const otherParams = Object.entries(others);

    if (otherParams.length === 0) {
      return `realm=${sanitizedRealm}`;
    }

    const paramsString = otherParams
      .filter(([authParam]) => authParam.toLowerCase() !== 'realm')
      .map(([authParam, value]) => `${authParam}=${value}`)
      .join(', ');

    return `realm=${sanitizedRealm} ${paramsString}`;
  }
}

export default AuthError;
