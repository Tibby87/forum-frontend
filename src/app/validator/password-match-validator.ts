import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.parent?.get('password')?.value;
  const confirmPassword = control?.parent?.get('confirmPassword')?.value;

  if (password !== confirmPassword) {
    return { passwordsDontMatch: true };
  }
  return null;
};
