import { Component, signal, computed, OnInit, effect } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FundRepository, ParticipantRepository, LoanRepository, PaymentRepository } from '../../../../data/repositories';
import { StateService } from '../../../../data/services';
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
    MatSnackBarModule,
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
                  <button mat-menu-item class="delete-menu-item" (click)="confirmDeleteFund(fund)">
                    <mat-icon>delete_forever</mat-icon>
                    <span>Eliminar Fondo</span>
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
  // En tiempo real desde StateService
  funds = this.state.funds;
  isLoading = signal(true);

  constructor(
    private readonly state: StateService,
    private readonly fundRepo: FundRepository,
    private readonly participantRepo: ParticipantRepository,
    private readonly loanRepo: LoanRepository,
    private readonly paymentRepo: PaymentRepository,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
  ) {
    // Cuando los fondos llegan, quitar el loading
    effect(() => {
      if (this.state.funds().length >= 0) {
        this.isLoading.set(false);
      }
    });
  }

  ngOnInit(): void {
    this.state.subscribeToFunds();
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

  async confirmDeleteFund(fund: Fund): Promise<void> {
    const confirm1 = window.confirm(
      `¿Estás seguro de eliminar el fondo "${fund.name}"?\n\nEsta acción eliminará TODOS los datos asociados: participantes, préstamos, pagos y sorteos.`
    );
    if (!confirm1) return;

    const confirm2 = window.confirm(
      `Última confirmación: Se borrará "${fund.name}" y toda su información de forma PERMANENTE. ¿Continuar?`
    );
    if (!confirm2) return;

    try {
      // Eliminar en cascada: pagos → préstamos → participantes → fondo
      const [participants, loans, payments] = await Promise.all([
        this.participantRepo.getByFund(fund.id),
        this.loanRepo.getByFund(fund.id),
        this.paymentRepo.getByFund(fund.id),
      ]);

      // Borrar pagos
      await Promise.all(payments.map(p => this.paymentRepo.delete(p.id)));
      // Borrar préstamos
      await Promise.all(loans.map(l => this.loanRepo.delete(l.id)));
      // Borrar participantes
      await Promise.all(participants.map(p => this.participantRepo.delete(p.id)));
      // Borrar el fondo
      await this.fundRepo.delete(fund.id);

      this.snackBar.open(`Fondo "${fund.name}" eliminado correctamente.`, 'OK', { duration: 4000 });
    } catch (error) {
      console.error('Error deleting fund:', error);
      this.snackBar.open('Error al eliminar el fondo. Inténtalo de nuevo.', 'OK', { duration: 4000 });
    }
  }
}
