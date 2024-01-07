import { AbstractException } from './AbstractException.abstract';

export class RouteNotFoundException extends AbstractException {
  status = 404;
  message = 'Route not found';
}
