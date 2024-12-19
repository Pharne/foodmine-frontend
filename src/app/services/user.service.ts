import { Injectable } from '@angular/core';
import { User } from '../shared/models/user';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { IUserLogin } from '../shared/models/Interfaces/iUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/models/Interfaces/iUserRegister';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<User>;
  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private toasterService: ToastrService) {
    this.userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): User {
    return this.userSubject.value;
  }

  // Login function with enhanced error handling
  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);  // Store user in localStorage
          this.userSubject.next(user);  // Update user in BehaviorSubject
          this.toasterService.success(`Welcome ${user.name}`);
        },
        error: (error) => {
          this.toasterService.error(error.error || 'Login failed', 'Login Failed');
          console.error(error);
        }
      }),
      catchError(error => {
        // Log the error
        console.error('Login error:', error);
        // Return a throwError observable to propagate the error
        return throwError(() => new Error(error.error || 'Login failed'));
      })
    );
  }

  // Register function with enhanced error handling
  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user: User) => {
          this.setUserToLocalStorage(user);  // Store user in localStorage
          this.userSubject.next(user);  // Update user in BehaviorSubject
          this.toasterService.success(`Welcome ${user.name}`, 'Register Successful');
        },
        error: (error: { error: any; }) => {
          this.toasterService.error(error.error || 'Registration failed', 'Register Failed');
          console.error(error);
        }
      }),
      catchError(error => {
        // Log the error
        console.error('Registration error:', error);
        // Return a throwError observable to propagate the error
        return throwError(() => new Error(error.error || 'Registration failed'));
      })
    );
  }

  // Logout and clear session information
  logout() {
    this.userSubject.next(new User());  // Reset user
    localStorage.removeItem(USER_KEY);  // Remove user from localStorage
    this.toasterService.success('Logout Successful');
    window.location.reload();  // Reload to reset application state
  }

  private setUserToLocalStorage(user: User) {
    // Save user to localStorage if token exists
    if (user.token) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) {
      return JSON.parse(userJson) as User;  // Parse the stored user
    } else {
      return new User();  // Return an empty user if no user data found
    }
  }

  // Optional: Check if user is authenticated
  public isAuthenticated(): boolean {
    return !!this.currentUser?.token;  // Check if the user has a token
  }

  // Optional: Get the token (if needed)
  public getToken(): string | null {
    return this.currentUser?.token || null;  // Return the token or null
  }
}
