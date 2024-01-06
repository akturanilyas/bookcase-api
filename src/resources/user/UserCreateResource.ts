import { User } from '../../models/User';
import { AbstractResource } from '../AbstractResource';

export class UserCreateResource extends AbstractResource {
  public toJson(resource: object): object {
    const user = resource as User;

    return {
      id: user.id,
      name: user.name,
    };
  }
}
