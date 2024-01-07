import { UserModel } from '../../models/User.model';
import { AbstractResource } from '../AbstractResource.abstract';

export class UserCreateResource extends AbstractResource<UserModel> {
  public toJson(): object {
    return {
      id: this.resource.id,
      name: this.resource.name,
    };
  }
}
