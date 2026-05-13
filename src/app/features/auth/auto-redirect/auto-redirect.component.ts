import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../data/services';

/**
 * Componente de redirección inteligente.
 * Se usa en la ruta raíz (/) para dirigir al usuario
 * al lugar correcto según su estado de autenticación.
 */
@Component({
  selector: 'bf-auto-redirect',
  standalone: true,
  template: `
    <div class="redirect-container">
      <div class="spinner"></div>
      <p>Cargando...</p>
    </div>
  `,
  styles: [`
    .redirect-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      gap: 16px;
      color: rgba(255, 255, 255, 0.6);
      font-family: 'Inter', sans-serif;
    }
    .spinner {
      width: 36px;
      height: 36px;
      border: 3px solid rgba(255, 255, 255, 0.1);
      border-top-color: #818cf8;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  `],
})
export class AutoRedirectComponent implements OnInit {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.auth.authReady;
    this.redirect();
  }

  private redirect(): void {
    if (this.auth.isAdmin()) {
      this.router.navigate(['/admin/dashboard'], { replaceUrl: true });
    } else if (this.auth.isAuthenticated()) {
      this.router.navigate(['/participant/dashboard'], { replaceUrl: true });
    } else {
      this.router.navigate(['/auth/login'], { replaceUrl: true });
    }
  }
}
