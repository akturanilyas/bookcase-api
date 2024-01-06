import { Request } from 'express';
import { UserService } from '../services/UserService';
import { UserCreateResource } from '../resources/user/UserCreateResource';
import { UserIndexResource } from '../resources/user/UserIndexResource';
import { UserShowResource } from '../resources/user/UserShowResource';
import HttpStatusCode from '../enums/httpStatus.enum';
import BaseController from './BaseController.abstract';

export class UserController extends BaseController {
  private service: UserService;

  constructor() {
    super();
    this.service = new UserService();
  }

  public store = async (req: Request) => {
    const user = await this.service.createUser({ ...req.body });

    return new UserCreateResource({ statusCode: HttpStatusCode.CREATED, resource: user });
  };

  public index = async (req: Request) => {
    const users = await this.service.getUsers({});

    return new UserIndexResource({ resource: users });
  };

  public show = async (req: Request) => {
    const { userId } = req.params;

    const user = await this.service.getUser({
      params: { id: Number(userId) },
      relations: { books: { book: true } },
    });

    return new UserShowResource({ resource: user });
  };
}
