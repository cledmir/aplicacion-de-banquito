import { Component, signal, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../data/services';

@Component({
  selector: 'bf-setup',
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
          <span class="auth-logo">🔧</span>
          <h1 class="auth-title">Configuración Inicial</h1>
          <p class="auth-subtitle">Crea la cuenta de administrador</p>
        </div>

        @if (alreadySetup()) {
          <div class="setup-done">
            <mat-icon>check_circle</mat-icon>
            <p>Ya existe un administrador configurado.</p>
            <a mat-flat-button color="primary" routerLink="/auth/login">
              Ir al Login
            </a>
          </div>
        } @else {
          <form class="auth-form" (ngSubmit)="onSetup()">
            <mat-form-field appearance="outline">
              <mat-label>Nombre completo</mat-label>
              <input
                matInput
                type="text"
                [(ngModel)]="displayName"
                name="displayName"
                required
                id="setup-name"
              />
              <mat-icon matPrefix>person</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Correo electrónico</mat-label>
              <input
                matInput
                type="email"
                [(ngModel)]="email"
                name="email"
                required
                id="setup-email"
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
                minlength="6"
                id="setup-password"
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

            <mat-form-field appearance="outline">
              <mat-label>Confirmar contraseña</mat-label>
              <input
                matInput
                [type]="showPassword() ? 'text' : 'password'"
                [(ngModel)]="confirmPassword"
                name="confirmPassword"
                required
                id="setup-confirm-password"
              />
              <mat-icon matPrefix>lock_outline</mat-icon>
            </mat-form-field>

            @if (errorMessage()) {
              <div class="auth-error">
                <mat-icon>error_outline</mat-icon>
                <span>{{ errorMessage() }}</span>
              </div>
            }

            @if (successMessage()) {
              <div class="auth-success">
                <mat-icon>check_circle</mat-icon>
                <span>{{ successMessage() }}</span>
              </div>
            }

            <button
              mat-flat-button
              color="primary"
              type="submit"
              class="auth-submit"
              [disabled]="isLoading()"
              id="setup-submit"
            >
              @if (isLoading()) {
                <mat-spinner diameter="20" />
              } @else {
                Crear Administrador
              }
            </button>
          </form>

          <div class="auth-footer">
            <a routerLink="/auth/login" class="setup-link">
              ¿Ya tienes cuenta? Inicia sesión
            </a>
          </div>
        }
      </div>

      <div class="auth-decoration">
        <div class="decoration-circle decoration-circle--1"></div>
        <div class="decoration-circle decoration-circle--2"></div>
        <div class="decoration-circle decoration-circle--3"></div>
      </div>
    </div>
  `,
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit {
  displayName = '';
  email = '';
  password = '';
  confirmPassword = '';
  showPassword = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  alreadySetup = signal(false);

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
  ) {}

  async ngOnInit(): Promise<void> {
    const hasAdmin = await this.auth.hasAdmin();
    this.alreadySetup.set(hasAdmin);
  }

  async onSetup(): Promise<void> {
    if (!this.displayName || !this.email || !this.password) {
      this.errorMessage.set('Completa todos los campos.');
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage.set('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage.set('Las contraseñas no coinciden.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      await this.auth.setupAdmin(this.email, this.password, this.displayName);
      this.successMessage.set('¡Administrador creado exitosamente!');

      setTimeout(() => {
        this.router.navigate(['/admin/dashboard']);
      }, 1500);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error al crear administrador.';

      if (message.includes('auth/email-already-in-use')) {
        this.errorMessage.set('Este correo ya está registrado.');
      } else if (message.includes('Ya existe')) {
        this.errorMessage.set(message);
        this.alreadySetup.set(true);
      } else {
        this.errorMessage.set(message);
      }
    } finally {
      this.isLoading.set(false);
    }
  }
}
