import { AbstractException } from '../AbstractException.abstract';

export class UserNotFoundException extends AbstractException {
  status = 404;
  message = 'User not found';
}
