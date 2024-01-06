import { AbstractResource } from '../AbstractResource';
import { UserBook } from '../../models/UserBooks';

export class ReturnBookResource extends AbstractResource {
  public toJson(resource: object): object {
    const book = resource as UserBook;

    return {
      ...book,
    };
  }
}
