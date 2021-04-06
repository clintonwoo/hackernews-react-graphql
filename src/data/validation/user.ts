import { ValidationError, ValidationCode } from './validation-error';

export function validateUsername({ id }): boolean {
  if (id.length < 3 || id.length > 32) {
    throw new ValidationError({
      code: ValidationCode.ID,
      message: 'User ID must be between 3 and 32 characters.',
    });
  }

  return true;
}

export function validateNewUser({ id, password }): boolean {
  if (id.length < 3 || id.length > 32) {
    throw new ValidationError({
      code: ValidationCode.ID,
      message: 'User ID must be between 3 and 32 characters.',
    });
  }

  if (password.length < 8 || password.length > 100) {
    throw new ValidationError({
      code: ValidationCode.PASSWORD,
      message: 'User password must be longer than 8 characters.',
    });
  }

  return true;
}
