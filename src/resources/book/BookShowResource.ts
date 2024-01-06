import { AbstractResource } from '../AbstractResource';
import { Book } from '../../models/Book';

export class BookShowResource extends AbstractResource {
  public toJson(resource: object): object {
    const book = resource as Book;

    return {
      id: book.id,
      name: book.name,
      score: book.score,
    };
  }
}
