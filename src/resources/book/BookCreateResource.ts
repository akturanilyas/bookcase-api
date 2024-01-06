import { BookModel } from '../../models/Book.model';
import { AbstractResource } from '../AbstractResource.abstract';

export class BookCreateResource extends AbstractResource {
  public toJson(resource: object): object {
    const book = resource as BookModel;

    return {
      id: book.id,
      name: book.name,
    };
  }
}
