import { BookModel } from '../../models/Book.model';
import { AbstractResource } from '../AbstractResource.abstract';

export class BookIndexResource extends AbstractResource {
  public toJson(resource: object): object {
    const books = resource as Array<BookModel>;

    return books.map(book => ({
      id: book.id,
      name: book.name,
    }));
  }
}
