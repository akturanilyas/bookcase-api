import { AbstractException } from '../AbstractException.abstract';

export class UserBookNotFoundException extends AbstractException {
  status = 404;
  message = 'User book not found';
}
