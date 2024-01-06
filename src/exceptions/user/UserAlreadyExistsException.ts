import { AbstractException } from '../AbstractException.abstract';

export class UserAlreadyExistsException extends AbstractException {
  status = 409;
  message = 'User already exists';
}
