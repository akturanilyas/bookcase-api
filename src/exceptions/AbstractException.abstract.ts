export abstract class AbstractException extends Error {
  public type: string | null = null;
  public status: number;

  public constructor(message: string | null = null, status = 500) {
    super(message || 'HTTP error');
    this.status = status;
  }
}
