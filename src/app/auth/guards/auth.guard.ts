import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);  // Inject UserService
  const router = inject(Router);  // Inject Router

  // Check if the user has a valid token
  if (userService.currentUser?.token) {
    return true; // Allow access if the user is authenticated
  }

  // Redirect to login page if not authenticated
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false; // Deny access
};
