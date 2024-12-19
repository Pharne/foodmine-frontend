import { Component } from '@angular/core';
import { TitleComponent } from "../../partials/title/title.component";
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { matchValidator } from '../../../shared/validators/password_match_validator';
import { IUserRegister } from '../../../shared/models/Interfaces/iUserRegister';
import { InputContainerComponent } from "../../partials/input-container/input-container.component";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputValidationComponent } from "../../partials/input-validation/input-validation.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    TitleComponent,
    InputContainerComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputValidationComponent,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      ConfirmPassword: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(5)]]
    }, {
      validators: matchValidator('password', 'ConfirmPassword')
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  get fc() {
    return this.registerForm.controls;
  }

  submit() {
    this.isSubmitted = true;

    if (this.registerForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    this.userService.register({
      name: this.fc.name.value,
      email: this.fc.email.value,
      password: this.fc.password.value,
      confirmPassword: this.fc.ConfirmPassword.value,
      address: this.fc.address.value,
    }).subscribe({
      next: () => this.router.navigateByUrl(this.returnUrl),
      error: (err) => console.error('Registration failed:', err)
    });
  }
}
