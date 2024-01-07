export abstract class AbstractResource<T> {
  public statusCode: number;

  public message: string;

  public data?: object | null;

  public resource: T;

  public constructor({
    statusCode,
    message,
    resource,
  }: {
    statusCode?: number;
    message?: string;
    resource?: T;
  }) {
    if (resource) {
      this.resource = resource;
    }
    this.data = resource ? this.toJson() : {};
    this.statusCode = statusCode || 200;
    this.message = message || '';
  }

  public abstract toJson(): object | null;
}
