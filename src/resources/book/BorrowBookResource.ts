import { UserBook } from '../../models/UserBooks.model';
import { AbstractResource } from '../AbstractResource.abstract';

export class BorrowBookResource extends AbstractResource<UserBook> {
  public toJson(): object {
    const book = this.resource;

    return {
      ...book,
    };
  }
}
