export enum ValidationCode {
  ID = 'id',
  PASSWORD = 'pw',
  TITLE = 'title',
  URL = 'url',
  TEXT = 'text',
}

export class ValidationError extends Error {
  public code: ValidationCode;

  constructor(err) {
    super(err.message);
    this.message = err.message;
    this.code = err.code;

    Error.captureStackTrace(this, ValidationError);
  }
}
