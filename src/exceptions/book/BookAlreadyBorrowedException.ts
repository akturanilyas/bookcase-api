import { AbstractException } from '../AbstractException.abstract';

export class BookAlreadyBorrowedException extends AbstractException {
  status = 409;
  message = 'Book already borrowed.';
}
