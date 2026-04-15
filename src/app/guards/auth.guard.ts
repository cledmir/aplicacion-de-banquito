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

  await waitForAuth(auth);

  if (auth.isAuthenticated()) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};

function waitForAuth(auth: AuthService): Promise<void> {
  return new Promise((resolve) => {
    if (!auth.isLoading()) {
      resolve();
      return;
    }
    const interval = setInterval(() => {
      if (!auth.isLoading()) {
        clearInterval(interval);
        resolve();
      }
    }, 50);
    setTimeout(() => { clearInterval(interval); resolve(); }, 5000);
  });
}
