import { describe, expect } from '@jest/globals';
import { User } from '../../models/User';
import { UserService } from '../../services/UserService';
import { matchArrayKeys } from '../../utils/testUtils';

describe('UserService', () => {
  const user = {
    email: 'test@gmail.com',
    password: 'password',
    age: 12,
    last_name: 'last_name',
    name: 'name',
    username: 'username',
  };

  it('Check create user method', async () => {
    const res: User | null = await new UserService().createUser(user);

    expect(res).toBeInstanceOf(User);
    expect(res).toHaveProperty('id');
    expect(res).toHaveProperty('name');
    expect(res?.name).toBe(user.name);
  });

  it('Check index user method', async () => {
    await new UserService().createUser(user);
    await new UserService().createUser({ ...user });

    const users: Array<User> = await new UserService().getUsers({});

    expect(users).toBeInstanceOf(Array<User>);
    expect(users).toHaveLength(2);
    matchArrayKeys(users, ['id', 'name']);
  });
});
