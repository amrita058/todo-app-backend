export class ErrorHandler extends Error {
  public statusCode: number;
  public msg?: string;

  constructor(message: string, statusCode: number, msg?: string) {
    super(message);
    this.statusCode = statusCode;
    this.msg = msg;
  }
}
