import request from 'supertest';
import { expect } from '@jest/globals';
import { app } from '../app';

export const postRequest = async ({
  path,
  body,
  token = '',
}: {
  path: string;
  body?: Record<string, unknown>;
  token?: string;
}) => {
  const response = await request(app)
    .post(`${path}`)
    .send(body)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .auth(token, { type: 'bearer' });

  return response;
};

export const getRequest = async ({
  path,
  query,
  token = '',
}: {
  path: string;
  query?: Record<string, unknown>;
  token?: string;
}) => {
  const response = await request(app)
    .get(`${path}`)
    .query(query || {})
    .auth(token, { type: 'bearer' });

  return response;
};

export const matchObjectKeys = (
  object: Record<string, unknown> | object,
  keys: Array<string>,
) => {
  keys.forEach((key: string) => {
    expect(object).toHaveProperty(key);
  });
};

export const matchArrayKeys = (
  array: Array<Record<string, unknown> | object>,
  keys: Array<string>,
) => {
  array.forEach(item => {
    matchObjectKeys(item, keys);
  });
};
