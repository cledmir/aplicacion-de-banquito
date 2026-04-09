import { Component, computed } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../data/services';

@Component({
  selector: 'bf-participant-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
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
          <button mat-icon-button (click)="logout()">
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
    </div>
  `,
  styleUrls: ['./participant-layout.component.scss'],
})
export class ParticipantLayoutComponent {
  userInitials = computed(() => {
    const name = this.auth.user()?.displayName ?? '';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  });

  constructor(
    public readonly auth: AuthService,
    private readonly router: Router,
  ) {}

  async logout(): Promise<void> {
    await this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
