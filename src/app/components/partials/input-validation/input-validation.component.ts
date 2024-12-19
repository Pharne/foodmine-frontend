import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATOR_MESSAGES: { [key: string]: string } = {
  required: 'Should not be empty',
  email: 'Should be a valid email address',
  minlength: 'Input is too short',
  maxlength: 'Input is too long',
};

@Component({
  selector: 'input-validation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css'],
})
export class InputValidationComponent implements OnChanges {
  @Input() control!: AbstractControl; // Flexible form control type
  @Input() showErrorsWhen: boolean = true;

  errorMessages: string[] = []; // Array to hold error messages

  ngOnChanges(changes: SimpleChanges): void {
    this.updateErrorMessages();
  }

  updateErrorMessages(): void {
    if (!this.control || !this.control.errors || !this.showErrorsWhen) {
      this.errorMessages = [];
      return;
    }

    // Map errors to corresponding messages
    this.errorMessages = Object.keys(this.control.errors).map(
      (key) => VALIDATOR_MESSAGES[key] || 'Invalid input'
    );
  }
}
