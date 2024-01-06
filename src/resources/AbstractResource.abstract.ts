export abstract class AbstractResource {
  public statusCode: number;

  public message: string;

  public data?: object;

  public constructor({
    statusCode,
    message,
    resource,
  }: {
    statusCode?: number;
    message?: string;
    resource?: object;
  }) {
    this.data = this.toJson(resource || {}) || {};
    this.statusCode = statusCode || 200;
    this.message = message || '';
  }

  public abstract toJson(resource: object): object | null;

  private toArray = (obj: object): Array<string> => Object.keys(obj).map(k => obj[k]);
}
