import { AbstractException } from '../AbstractException.abstract';

export class BookAlreadyReturnedException extends AbstractException {
  status = 409;
  message = 'Book already returned.';
}
