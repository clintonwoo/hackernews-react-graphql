import { ValidationError, ValidationCode } from './validation-error';
import { store } from 'react-notifications-component';

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

export function logoutSuccessMessage(): void {

  store.addNotification({
    message: "You have successfully logged out",
    type: "custom",
    insert: "top",
    container: "bottom-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 50000,
      onScreen: true
    },
    touchSlidingExit: {
      swipe: {
        duration: 400,
        timingFunction: 'ease-out',
        delay: 0,
      },
      fade: {
        duration: 400,
        timingFunction: 'ease-out',
        delay: 0
      }
    },
  });
}
