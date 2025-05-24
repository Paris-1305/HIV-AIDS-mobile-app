import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.value;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasDigits = /\d/.test(password);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isValidLength = password && password.length >= 6;
    
        if (password && !isValidLength) {
          return { 'passwordTooShort': true }; // Error when password is too short
        }
        if (password && !hasUpperCase) {
          return { 'passwordMissingUpperCase': true }; // Error when uppercase is missing
        }
        if (password && !hasSpecialChars) {
          return { 'passwordMissingSpecialChar': true }; // Error when special characters are missing
        }
        return null; // Valid password
      };
}
