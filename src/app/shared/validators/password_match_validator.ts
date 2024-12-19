import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const matchValidator = (passwordControlName: string, confirmPasswordControlName: string): ValidatorFn => {
    return (form: AbstractControl): ValidationErrors | null => {
        const passwordControl = form.get(passwordControlName);
        const confirmPasswordControl = form.get(confirmPasswordControlName);

        if (!passwordControl || !confirmPasswordControl) {
            return null; // If controls are not found, do nothing
        }

        if (passwordControl.value !== confirmPasswordControl.value) {
            confirmPasswordControl.setErrors({ passwordsDontMatch: true });
        } else {
            if (confirmPasswordControl.errors) {
                const { passwordsDontMatch, ...otherErrors } = confirmPasswordControl.errors;
                if (Object.keys(otherErrors).length > 0) {
                    confirmPasswordControl.setErrors(otherErrors); // Keep other errors
                } else {
                    confirmPasswordControl.setErrors(null); // Clear all errors
                }
            }
        }

        return null; // Validators should return null when no errors are found
    };
};
