import { AbstractResource } from '../AbstractResource.abstract';
import { UserModel } from '../../models/User.model';

export class UserIndexResource extends AbstractResource {
  public toJson(resource: object): object {
    const users = resource as Array<UserModel>;

    return users.map(user => ({
      id: user.id,
      name: user.name,
    }));
  }
}
