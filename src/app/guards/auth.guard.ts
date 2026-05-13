import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../data/services';

/**
 * Guard genérico — requiere solo estar autenticado.
 * Espera a que Firebase Auth termine de cargar antes de decidir.
 */
export const authGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  await auth.authReady;

  if (auth.isAuthenticated()) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};
