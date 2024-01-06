import { UserBook } from '../../models/UserBooks.model';
import { AbstractResource } from '../AbstractResource.abstract';

export class BorrowBookResource extends AbstractResource {
  public toJson(resource: object): object {
    const book = resource as UserBook;

    return {
      ...book,
    };
  }
}
