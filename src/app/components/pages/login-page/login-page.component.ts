// login-page.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InputContainerComponent } from "../../partials/input-container/input-container.component";
import { InputValidationComponent } from "../../partials/input-validation/input-validation.component";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, InputContainerComponent, InputValidationComponent, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  loginForm!: FormGroup;
  isSubmitted = false;
  returnUrl: string = '/'; // Default return URL is set to home

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the login form
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Get the returnUrl from query parameters or fallback to default
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  // Getter for easy access to form controls
  get fc() {
    return this.loginForm.controls;
  }

  submit() {
    this.isSubmitted = true;

    // If the form is invalid, stop the submission
    if (this.loginForm.invalid) return;

    console.log(JSON.stringify(this.loginForm.value));

    // Call the login method from the user service
    this.userService.login({
      email: this.fc.email.value,
      password: this.fc.password.value
    }).subscribe({
      next: () => {
        console.log('Login successful, navigating to:', this.returnUrl);
        this.router.navigateByUrl(this.returnUrl);
      },
      error: (err) => {
        // Handle error (for example, show an error message)
        console.error(err);
      }
    });
  }
}
