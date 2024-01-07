import { AbstractResource } from '../AbstractResource.abstract';
import { UserModel } from '../../models/User.model';

export class UserIndexResource extends AbstractResource<Array<UserModel>> {
  public toJson(): object {
    return this.resource.map(user => ({
      id: user.id,
      name: user.name,
    }));
  }
}
