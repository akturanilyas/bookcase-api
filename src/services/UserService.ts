import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { User } from '../models/User';
import { GetUserParams, GetUsersParams, UserCreateParams } from './UserService.interface';
import { UserNotFoundException } from '../exceptions/user/UserNotFoundException';

export class UserService {
  public createUser = async (params: UserCreateParams): Promise<User> => {
    const user = User.create({ ...params });

    await user.save();

    return user;
  };

  public getUsers = async ({
    params,
    relations,
  }: {
    params?: GetUsersParams;
    relations?: FindOptionsRelations<User>;
  }): Promise<Array<User>> => {
    const users = await User.find({ where: { ...params }, relations });

    return users;
  };

  public getUser = async ({
    params,
    relations,
  }: {
    params?: GetUserParams;
    relations?: FindOptionsRelations<User>;
  }): Promise<User> => {
    const user = await User.findOne({ where: { ...params }, relations });

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  };
}
