import { AbstractResource } from '../AbstractResource';
import { User } from '../../models/User';

export class UserIndexResource extends AbstractResource {
  public toJson(resource: object): object {
    const users = resource as Array<User>;

    return users.map(user => ({
      id: user.id,
      name: user.name,
    }));
  }
}
