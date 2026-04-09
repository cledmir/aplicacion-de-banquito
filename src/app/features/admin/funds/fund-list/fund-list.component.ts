import { Component, signal, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { FundRepository } from '../../../../data/repositories';
import { FundType, FundStatus } from '../../../../core/enums';
import type { Fund } from '../../../../core/models';

@Component({
  selector: 'bf-fund-list',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatMenuModule,
  ],
  template: `
    <div class="page animate-fade-in">
      <div class="page-header">
        <div>
          <h1 class="page-header__title">Fondos</h1>
          <p class="page-header__subtitle">Gestiona tus Banquitos y Canastitas</p>
        </div>
        <a mat-flat-button color="primary" routerLink="/admin/funds/create" id="create-fund-btn">
          <mat-icon>add</mat-icon>
          Nuevo Fondo
        </a>
      </div>

      @if (isLoading()) {
        <div class="card-grid">
          @for (i of [1, 2, 3]; track i) {
            <div class="skeleton-card">
              <div class="skeleton" style="height: 24px; width: 60%;"></div>
              <div class="skeleton" style="height: 16px; width: 40%; margin-top: 8px;"></div>
              <div class="skeleton" style="height: 40px; width: 100%; margin-top: 16px;"></div>
            </div>
          }
        </div>
      } @else if (funds().length === 0) {
        <div class="empty-state">
          <span class="empty-state__icon">🏦</span>
          <h3>No hay fondos creados</h3>
          <p>Crea tu primer Banquito o Canastita para comenzar</p>
          <a mat-flat-button color="primary" routerLink="/admin/funds/create">
            <mat-icon>add</mat-icon>
            Crear Fondo
          </a>
        </div>
      } @else {
        <div class="card-grid">
          @for (fund of funds(); track fund.id) {
            <div class="fund-card" (click)="goToFund(fund.id)">
              <div class="fund-card__header">
                <div class="fund-card__type">
                  <span class="fund-card__emoji">{{ fund.type === 'banquito' ? '🏦' : '🧺' }}</span>
                  <span class="fund-card__type-label" [class]="fund.type">
                    {{ fund.type === 'banquito' ? 'Banquito' : 'Canastita' }}
                  </span>
                </div>
                <span class="fund-card__status" [class]="fund.status">
                  {{ fund.status === 'active' ? 'Activo' : 'Cerrado' }}
                </span>
              </div>

              <h3 class="fund-card__name">{{ fund.name }}</h3>

              <div class="fund-card__details">
                <div class="fund-card__detail">
                  <span class="detail-label">Valor opción</span>
                  <span class="detail-value money">S/ {{ fund.optionValue.toFixed(2) }}</span>
                </div>
                <div class="fund-card__detail">
                  <span class="detail-label">Interés</span>
                  <span class="detail-value">{{ (fund.interestRate * 100).toFixed(0) }}%
                    {{ fund.type === 'banquito' ? 'compuesto' : 'simple' }}
                  </span>
                </div>
                <div class="fund-card__detail">
                  <span class="detail-label">Opciones</span>
                  <span class="detail-value">{{ fund.totalOptions }}</span>
                </div>
              </div>

              <div class="fund-card__actions">
                <button mat-icon-button (click)="goToFund(fund.id); $event.stopPropagation()">
                  <mat-icon>visibility</mat-icon>
                </button>
                <button mat-icon-button [matMenuTriggerFor]="menu" (click)="$event.stopPropagation()">
                  <mat-icon>more_vert</mat-icon>
                </button>
                <mat-menu #menu="matMenu">
                  <button mat-menu-item (click)="goToParticipants(fund.id)">
                    <mat-icon>people</mat-icon>
                    <span>Participantes</span>
                  </button>
                  <button mat-menu-item (click)="goToLoans(fund.id)">
                    <mat-icon>account_balance_wallet</mat-icon>
                    <span>Préstamos</span>
                  </button>
                  <button mat-menu-item (click)="goToPayments(fund.id)">
                    <mat-icon>receipt_long</mat-icon>
                    <span>Pagos</span>
                  </button>
                  <button mat-menu-item (click)="goToLottery(fund.id)">
                    <mat-icon>casino</mat-icon>
                    <span>Sorteo</span>
                  </button>
                </mat-menu>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styleUrls: ['./fund-list.component.scss'],
})
export class FundListComponent implements OnInit {
  funds = signal<Fund[]>([]);
  isLoading = signal(true);

  constructor(
    private readonly fundRepo: FundRepository,
    private readonly router: Router,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadFunds();
  }

  async loadFunds(): Promise<void> {
    this.isLoading.set(true);
    try {
      const funds = await this.fundRepo.getAll();
      this.funds.set(funds);
    } catch (error) {
      console.error('Error loading funds:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  goToFund(id: string): void {
    this.router.navigate(['/admin/funds', id]);
  }

  goToParticipants(id: string): void {
    this.router.navigate(['/admin/funds', id, 'participants']);
  }

  goToLoans(id: string): void {
    this.router.navigate(['/admin/funds', id, 'loans']);
  }

  goToPayments(id: string): void {
    this.router.navigate(['/admin/funds', id, 'payments']);
  }

  goToLottery(id: string): void {
    this.router.navigate(['/admin/funds', id, 'lottery']);
  }
}
