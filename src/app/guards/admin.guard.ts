import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../data/services';

/**
 * Guard para rutas de admin.
 * Espera a que Firebase Auth termine de cargar antes de decidir.
 */
export const adminGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Esperar a que Firebase Auth termine de restaurar la sesión
  await auth.authReady;

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
