import { AbstractException } from '../AbstractException.abstract';

export class BookAlreadyReturnedException extends AbstractException {
  status = 404;
  message = 'Book already returned.';
}
