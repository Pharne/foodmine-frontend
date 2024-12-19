import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService); // Inject the UserService safely
  const user = userService.currentUser;   // Safely access currentUser property

  if (user.token) { // Ensure user and token exist
    req = req.clone({
      setHeaders: {
          // Standard practice for token headers
        access_token: user.token 
      }
    });
  }

  return next(req); // Pass the modified request to the next handler
};
