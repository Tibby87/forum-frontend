import { FormGroup, ValidationErrors } from '@angular/forms';

export const passwordMatchValidator = (
  control: FormGroup
): ValidationErrors | null => {
  const password = control.get('password').value;
  const confirmPassword = control.get('confirmPassword').value;

  if (password !== confirmPassword) {
    return { passwordsDontMatch: true };
  }
  return null;
};
