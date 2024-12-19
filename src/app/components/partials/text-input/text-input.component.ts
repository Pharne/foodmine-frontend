import { Component, Input } from '@angular/core';
import { InputContainerComponent } from "../input-container/input-container.component";
import { InputValidationComponent } from "../input-validation/input-validation.component";
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'text-input',
  standalone: true,
  imports: [InputContainerComponent, InputValidationComponent,ReactiveFormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css'
})
export class TextInputComponent {
@Input() label:string = '';
@Input() showErrorsWhen:boolean = true;
@Input() control!:FormControl;
@Input() type: 'text' | 'email' | 'password' = 'text';

get formControl() {
  return this.control as unknown as FormControl;
}
}
