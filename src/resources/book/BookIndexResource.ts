import { AbstractResource } from '../AbstractResource';
import { Book } from '../../models/Book';

export class BookIndexResource extends AbstractResource {
  public toJson(resource: object): object {
    const books = resource as Array<Book>;

    return books.map(book => ({
      id: book.id,
      name: book.name,
    }));
  }
}
