import { AbstractException } from '../AbstractException.abstract';

export class BookNotFoundException extends AbstractException {
  status = 404;
  message = 'Book not found';
}
