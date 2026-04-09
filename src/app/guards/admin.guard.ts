import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../data/services';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoading()) {
    return true;
  }

  if (auth.isAdmin()) {
    return true;
  }

  if (auth.isAuthenticated()) {
    router.navigate(['/participant']);
  } else {
    router.navigate(['/auth/login']);
  }

  return false;
};
