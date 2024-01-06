import * as jwt from 'jsonwebtoken';
import { trimStart } from 'lodash';
import environment from '../builders/envBuilder';

export const serializeToken = (token: string): string => {
  if (token.startsWith('Bearer ')) {
    return trimStart(trimStart(token, 'Bearer'));
  }

  return token;
};

export const getUserIdByToken = (token: string): string =>
  (
    jwt.verify(token, environment.jwt_token as string) as {
      id: string;
    }
  ).id;
