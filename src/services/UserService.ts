import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { UserModel } from '../models/User.model';
import { GetUserParams, GetUsersParams, UserCreateParams } from './UserService.interface';
import { UserNotFoundException } from '../exceptions/user/UserNotFoundException';

export class UserService {
  public createUser = async (params: UserCreateParams): Promise<UserModel> => {
    const user = UserModel.create({ ...params });

    await user.save();

    return user;
  };

  public getUsers = async ({
    params,
    relations,
  }: {
    params?: GetUsersParams;
    relations?: FindOptionsRelations<UserModel>;
  }): Promise<Array<UserModel>> => {
    const users = await UserModel.find({ where: { ...params }, relations });

    return users;
  };

  public getUser = async ({
    params,
    relations,
  }: {
    params?: GetUserParams;
    relations?: FindOptionsRelations<UserModel>;
  }): Promise<UserModel> => {
    const user = await UserModel.findOne({ where: { ...params }, relations });

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  };
}
