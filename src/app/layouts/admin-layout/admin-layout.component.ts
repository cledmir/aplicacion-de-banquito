import { Component, signal, computed } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../data/services';

@Component({
  selector: 'bf-admin-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  template: `
    <div class="admin-layout">
      <!-- Sidebar -->
      <aside class="sidebar" [class.collapsed]="sidebarCollapsed()">
        <div class="sidebar__header">
          <div class="sidebar__logo">
            <span class="logo-icon">🏦</span>
            @if (!sidebarCollapsed()) {
              <span class="logo-text">Banco Familia</span>
            }
          </div>
          <button
            mat-icon-button
            class="sidebar__toggle"
            (click)="toggleSidebar()"
          >
            <mat-icon>{{ sidebarCollapsed() ? 'chevron_right' : 'chevron_left' }}</mat-icon>
          </button>
        </div>

        <nav class="sidebar__nav">
          <a
            routerLink="/admin/dashboard"
            routerLinkActive="active"
            class="nav-item"
            [matTooltip]="sidebarCollapsed() ? 'Dashboard' : ''"
            matTooltipPosition="right"
          >
            <mat-icon>dashboard</mat-icon>
            @if (!sidebarCollapsed()) {
              <span>Dashboard</span>
            }
          </a>
          <a
            routerLink="/admin/funds"
            routerLinkActive="active"
            class="nav-item"
            [matTooltip]="sidebarCollapsed() ? 'Fondos' : ''"
            matTooltipPosition="right"
          >
            <mat-icon>account_balance</mat-icon>
            @if (!sidebarCollapsed()) {
              <span>Fondos</span>
            }
          </a>
          <a
            routerLink="/admin/users"
            routerLinkActive="active"
            class="nav-item"
            [matTooltip]="sidebarCollapsed() ? 'Usuarios' : ''"
            matTooltipPosition="right"
          >
            <mat-icon>people</mat-icon>
            @if (!sidebarCollapsed()) {
              <span>Usuarios</span>
            }
          </a>
        </nav>

        <div class="sidebar__footer">
          <div class="user-info" [class.collapsed]="sidebarCollapsed()">
            <div class="user-avatar">
              {{ userInitials() }}
            </div>
            @if (!sidebarCollapsed()) {
              <div class="user-details">
                <span class="user-name">{{ auth.user()?.displayName }}</span>
                <span class="user-role">Administrador</span>
              </div>
            }
          </div>
          <button
            mat-icon-button
            (click)="logout()"
            [matTooltip]="'Cerrar sesión'"
            matTooltipPosition="right"
            class="logout-btn"
          >
            <mat-icon>logout</mat-icon>
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <router-outlet />
      </main>
    </div>
  `,
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent {
  sidebarCollapsed = signal(false);

  userInitials = computed(() => {
    const name = this.auth.user()?.displayName ?? '';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  });

  constructor(
    public readonly auth: AuthService,
    private readonly router: Router,
  ) {}

  toggleSidebar(): void {
    this.sidebarCollapsed.update((v) => !v);
  }

  async logout(): Promise<void> {
    await this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
