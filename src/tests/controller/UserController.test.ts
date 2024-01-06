import { describe, expect } from '@jest/globals';
import { ENDPOINT } from '../../constants/endpoint.constant';
import {
  getRequest,
  matchArrayKeys,
  matchObjectKeys,
  postRequest,
} from '../../utils/testUtils';
import HttpStatusCode from '../../enums/httpStatus';

describe('UserController', () => {
  it('check user create endpoint', async () => {
    const res = await postRequest({
      path: ENDPOINT.USERS,
      body: { name: 'first name' },
    });

    expect(res.statusCode).toBe(HttpStatusCode.CREATED);
    matchObjectKeys(res.body, ['id', 'name']);
  });

  it('check user index endpoint', async () => {
    await postRequest({
      path: ENDPOINT.USERS,
      body: { name: 'first name' },
    });

    const res = await getRequest({
      path: ENDPOINT.USERS,
    });

    expect(res.statusCode).toBe(HttpStatusCode.OK);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body).toHaveLength(1);
    matchArrayKeys(res.body, ['id', 'name']);
  });
});
