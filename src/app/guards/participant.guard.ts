import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../data/services';

export const participantGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoading()) {
    return true;
  }

  if (auth.isParticipant() || auth.isAdmin()) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};
