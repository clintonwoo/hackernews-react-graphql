export default class ValidationError extends Error {
  constructor(err) {
    super(err.message);
    this.code = err.code;

    Error.captureStackTrace(this, ValidationError);
  }
}
