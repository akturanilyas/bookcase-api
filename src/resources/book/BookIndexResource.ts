import { BookModel } from '../../models/Book.model';
import { AbstractResource } from '../AbstractResource.abstract';

export class BookIndexResource extends AbstractResource<Array<BookModel>> {
  public toJson(): object {
    const books = this.resource;

    return books.map(book => ({
      id: book.id,
      name: book.name,
    }));
  }
}
