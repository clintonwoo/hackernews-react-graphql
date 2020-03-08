export enum ValidationCode {
  ID = 'id',
  PASSWORD = 'pw',
}

export class ValidationError extends Error {
  public code: ValidationCode;

  constructor(err) {
    super(err.message);

    this.code = err.code;

    Error.captureStackTrace(this, ValidationError);
  }
}
