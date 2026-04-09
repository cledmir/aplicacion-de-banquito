import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../data/services';
import { UserRole } from '../../../core/enums';

@Component({
  selector: 'bf-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="auth-page">
      <div class="auth-container animate-scale-in">
        <div class="auth-header">
          <span class="auth-logo">🏦</span>
          <h1 class="auth-title">Banco Familia</h1>
          <p class="auth-subtitle">Inicia sesión para continuar</p>
        </div>

        <form class="auth-form" (ngSubmit)="onLogin()">
          <mat-form-field appearance="outline">
            <mat-label>Correo electrónico</mat-label>
            <input
              matInput
              type="email"
              [(ngModel)]="email"
              name="email"
              required
              id="login-email"
            />
            <mat-icon matPrefix>email</mat-icon>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Contraseña</mat-label>
            <input
              matInput
              [type]="showPassword() ? 'text' : 'password'"
              [(ngModel)]="password"
              name="password"
              required
              id="login-password"
            />
            <mat-icon matPrefix>lock</mat-icon>
            <button
              mat-icon-button
              matSuffix
              type="button"
              (click)="showPassword.set(!showPassword())"
            >
              <mat-icon>{{ showPassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
            </button>
          </mat-form-field>

          @if (errorMessage()) {
            <div class="auth-error">
              <mat-icon>error_outline</mat-icon>
              <span>{{ errorMessage() }}</span>
            </div>
          }

          <button
            mat-flat-button
            color="primary"
            type="submit"
            class="auth-submit"
            [disabled]="isLoading()"
            id="login-submit"
          >
            @if (isLoading()) {
              <mat-spinner diameter="20" />
            } @else {
              Iniciar Sesión
            }
          </button>
        </form>

        <div class="auth-footer">
          <a routerLink="/auth/setup" class="setup-link">
            ¿Primera vez? Configurar administrador
          </a>
        </div>
      </div>

      <div class="auth-decoration">
        <div class="decoration-circle decoration-circle--1"></div>
        <div class="decoration-circle decoration-circle--2"></div>
        <div class="decoration-circle decoration-circle--3"></div>
      </div>
    </div>
  `,
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  showPassword = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
  ) {}

  async onLogin(): Promise<void> {
    if (!this.email || !this.password) {
      this.errorMessage.set('Completa todos los campos.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      const user = await this.auth.login(this.email, this.password);

      if (user.role === UserRole.ADMIN) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/participant/dashboard']);
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Error al iniciar sesión.';

      if (message.includes('auth/invalid-credential') || message.includes('auth/wrong-password')) {
        this.errorMessage.set('Correo o contraseña incorrectos.');
      } else if (message.includes('auth/user-not-found')) {
        this.errorMessage.set('No se encontró una cuenta con este correo.');
      } else if (message.includes('auth/too-many-requests')) {
        this.errorMessage.set('Demasiados intentos. Intenta más tarde.');
      } else {
        this.errorMessage.set('Error al iniciar sesión. Verifica tus datos.');
      }
    } finally {
      this.isLoading.set(false);
    }
  }
}
