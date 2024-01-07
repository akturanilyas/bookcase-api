import { BookModel } from '../../models/Book.model';
import { AbstractResource } from '../AbstractResource.abstract';

export class BookCreateResource extends AbstractResource<BookModel> {
  public toJson(): object {
    const book = this.resource;

    return {
      id: book.id,
      name: book.name,
    };
  }
}
