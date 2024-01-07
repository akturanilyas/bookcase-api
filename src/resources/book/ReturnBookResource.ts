import { UserBook } from '../../models/UserBooks.model';
import { AbstractResource } from '../AbstractResource.abstract';

export class ReturnBookResource extends AbstractResource<UserBook> {
  public toJson(): object {
    return this.resource;
  }
}
