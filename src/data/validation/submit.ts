import { ValidationError, ValidationCode } from './validation-error';
import { store } from 'react-notifications-component';
import { isValidUrl } from '../../helpers/is-valid-url';

export function validateTitle({ title }): boolean {
  if (!(title.length < 100)) {
    throw new ValidationError({
      code: ValidationCode.TITLE,
      message: 'The Title should not be more than 100 characters',
    });
  }

  if (title.length === 0) {
      throw new ValidationError({
          code: ValidationCode.TITLE,
          message: 'Title should not be empty',
      });
  }

  return true;
}


export function validateUrlorText({ url, text }): boolean {
  if (!isValidUrl(url) && text.length ===0) {
    throw new ValidationError({
      code: ValidationCode.URL,
      message: 'Invalid Url or Invalid Text',
    });
  }

  return true;
}

export function validateText({text}): boolean {
  if (text.length ===0) {
    throw new ValidationError({
      code: ValidationCode.TEXT,
      message: 'Text should not be empty',
    });
  }

  if (text.length > 500) {
      throw new ValidationError({
      code: ValidationCode.TEXT,
      message: 'Text should not be more than 500 characters',
    });
  }

  return true;
}

export function submitSuccess(): void {

  store.addNotification({
    title: "Submit Success",
    message: "Successfully Submitted",
    type: "danger",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true
    }
  });
}