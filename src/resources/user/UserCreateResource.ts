import { UserModel } from '../../models/User.model';
import { AbstractResource } from '../AbstractResource.abstract';

export class UserCreateResource extends AbstractResource {
  public toJson(resource: object): object {
    const user = resource as UserModel;

    return {
      id: user.id,
      name: user.name,
    };
  }
}
