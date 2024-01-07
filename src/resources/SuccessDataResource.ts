import { AbstractResource } from './AbstractResource.abstract';

export class SuccessDataResource extends AbstractResource<null> {
  public toJson(): null {
    return null;
  }
}
