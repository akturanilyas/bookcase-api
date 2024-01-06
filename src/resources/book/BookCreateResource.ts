import { AbstractResource } from '../AbstractResource';
import { Book } from '../../models/Book';

export class BookCreateResource extends AbstractResource {
  public toJson(resource: object): object {
    const book = resource as Book;

    return {
      id: book.id,
      name: book.name,
    };
  }
}
