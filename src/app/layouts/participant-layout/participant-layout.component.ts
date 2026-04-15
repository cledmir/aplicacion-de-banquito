import { Component, computed, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../data/services';

@Component({
  selector: 'bf-participant-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="participant-layout">
      <header class="topbar">
        <div class="topbar__left">
          <span class="logo-icon">🏦</span>
          <span class="logo-text">Banco Familia</span>
        </div>
        <div class="topbar__right">
          <div class="user-avatar">{{ userInitials() }}</div>
          <span class="user-name">{{ auth.user()?.displayName }}</span>
          <button mat-icon-button (click)="showPasswordModal.set(true)"
                  matTooltip="Cambiar contraseña" class="password-btn">
            <mat-icon>key</mat-icon>
          </button>
          <button mat-icon-button (click)="logout()" matTooltip="Cerrar sesión">
            <mat-icon>logout</mat-icon>
          </button>
        </div>
      </header>

      <nav class="bottom-nav">
        <a routerLink="/participant/dashboard" routerLinkActive="active" class="bottom-nav__item">
          <mat-icon>dashboard</mat-icon>
          <span>Inicio</span>
        </a>
        <a routerLink="/participant/simulator" routerLinkActive="active" class="bottom-nav__item">
          <mat-icon>calculate</mat-icon>
          <span>Simulador</span>
        </a>
        <a routerLink="/participant/loans" routerLinkActive="active" class="bottom-nav__item">
          <mat-icon>account_balance_wallet</mat-icon>
          <span>Préstamos</span>
        </a>
        <a routerLink="/participant/payments" routerLinkActive="active" class="bottom-nav__item">
          <mat-icon>receipt_long</mat-icon>
          <span>Pagos</span>
        </a>
      </nav>

      <main class="participant-content">
        <router-outlet />
      </main>

      <!-- Change Password Modal -->
      @if (showPasswordModal()) {
        <div class="modal-overlay" (click)="closePasswordModal()">
          <div class="modal-card" (click)="$event.stopPropagation()">
            <h3 class="modal-title">
              <mat-icon>key</mat-icon>
              Cambiar Contraseña
            </h3>
            <div class="modal-form">
              <mat-form-field appearance="outline">
                <mat-label>Contraseña actual</mat-label>
                <input matInput type="password" [(ngModel)]="currentPassword" />
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Nueva contraseña</mat-label>
                <input matInput type="password" [(ngModel)]="newPassword" />
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Confirmar nueva contraseña</mat-label>
                <input matInput type="password" [(ngModel)]="confirmPassword" />
              </mat-form-field>
              @if (passwordError()) {
                <div class="modal-error">
                  <mat-icon>error_outline</mat-icon>
                  {{ passwordError() }}
                </div>
              }
              <div class="modal-actions">
                <button mat-stroked-button (click)="closePasswordModal()">Cancelar</button>
                <button mat-flat-button color="primary" (click)="changePassword()"
                        [disabled]="isChangingPassword()">Guardar</button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styleUrls: ['./participant-layout.component.scss'],
})
export class ParticipantLayoutComponent {
  showPasswordModal = signal(false);
  passwordError = signal('');
  isChangingPassword = signal(false);

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  userInitials = computed(() => {
    const name = this.auth.user()?.displayName ?? '';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  });

  constructor(
    public readonly auth: AuthService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
  ) {}

  closePasswordModal(): void {
    this.showPasswordModal.set(false);
    this.passwordError.set('');
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }

  async changePassword(): Promise<void> {
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      this.passwordError.set('Completa todos los campos.');
      return;
    }
    if (this.newPassword.length < 6) {
      this.passwordError.set('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.passwordError.set('Las contraseñas no coinciden.');
      return;
    }

    this.isChangingPassword.set(true);
    this.passwordError.set('');

    try {
      await this.auth.changeOwnPassword(this.currentPassword, this.newPassword);
      this.snackBar.open('✅ Contraseña actualizada correctamente.', 'OK', { duration: 3000 });
      this.closePasswordModal();
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : '';
      if (msg.includes('wrong-password') || msg.includes('invalid-credential')) {
        this.passwordError.set('La contraseña actual es incorrecta.');
      } else {
        this.passwordError.set('Error al cambiar la contraseña. Inténtalo de nuevo.');
      }
    } finally {
      this.isChangingPassword.set(false);
    }
  }

  async logout(): Promise<void> {
    await this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
