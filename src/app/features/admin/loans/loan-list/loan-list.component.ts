import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LoanRepository, FundRepository } from '../../../../data/repositories';
import { LoanStatus } from '../../../../core/enums';
import type { Loan, Fund } from '../../../../core/models';

@Component({
  selector: 'bf-loan-list',
  standalone: true,
  imports: [RouterLink, DatePipe, MatButtonModule, MatIconModule, MatChipsModule, MatSnackBarModule, MatProgressSpinnerModule],
  template: `
    <div class="page animate-fade-in">
      <div class="page-header">
        <div>
          <h1 class="page-header__title">Préstamos</h1>
          @if (fund()) {
            <p class="page-header__subtitle">{{ fund()!.name }}</p>
          }
        </div>
        <div class="header-actions">
          <a mat-flat-button color="primary"
             [routerLink]="['/admin/funds', fundId, 'loans', 'create']">
            <mat-icon>add</mat-icon>
            Nuevo Préstamo
          </a>
          <a mat-button [routerLink]="['/admin/funds', fundId]">
            <mat-icon>arrow_back</mat-icon>
            Volver
          </a>
        </div>
      </div>

      @if (isLoading()) {
        <div class="loading-state" style="display:flex; flex-direction:column; align-items:center; opacity:0.7; padding:4rem;">
          <mat-spinner diameter="40"></mat-spinner>
          <p style="margin-top:1rem;">Cargando préstamos...</p>
        </div>
      } @else if (loans().length > 0) {
        <div class="loans-grid">
          @for (loan of loans(); track loan.id) {
            <div class="loan-card" [class.paid]="loan.status === LoanStatus.PAID">
              <div class="loan-header">
                <span class="loan-borrower">{{ loan.participantName }}</span>
                <span class="loan-status" [class]="loan.status">
                  {{ loan.status === LoanStatus.ACTIVE ? '⏳ Activo' : '✅ Pagado' }}
                </span>
              </div>

              <div class="loan-main">
                <div class="loan-amount">
                  <span class="label">Monto</span>
                  <span class="value money">S/ {{ loan.amount.toFixed(2) }}</span>
                </div>
                <div class="loan-detail">
                  <span class="label">Cuota mensual</span>
                  <span class="value">S/ {{ loan.monthlyPayment.toFixed(2) }}</span>
                </div>
                <div class="loan-detail">
                  <span class="label">Total a pagar</span>
                  <span class="value">S/ {{ loan.totalToPay.toFixed(2) }}</span>
                </div>
              </div>

              <div class="loan-progress">
                <div class="progress-info">
                  <span>{{ getPaidCount(loan) }}/{{ loan.installmentCount }} cuotas</span>
                  <span class="interest-earned">+ S/ {{ loan.interestGenerated.toFixed(2) }} interés</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" [style.width.%]="getProgress(loan)"></div>
                </div>
              </div>

              <div class="loan-footer">
                <span class="loan-date">{{ loan.startMonth }} → {{ loan.endMonth }}</span>
              </div>
            </div>
          }
        </div>
      } @else {
        <div class="empty-state">
          <span class="empty-state__icon">💰</span>
          <h3>No hay préstamos</h3>
          <p>Crea el primer préstamo para este fondo</p>
          <a mat-flat-button color="primary"
             [routerLink]="['/admin/funds', fundId, 'loans', 'create']">
            <mat-icon>add</mat-icon>
            Crear Préstamo
          </a>
        </div>
      }
    </div>
  `,
  styleUrls: ['./loan-list.component.scss'],
})
export class LoanListComponent implements OnInit {
  readonly LoanStatus = LoanStatus;
  fundId = '';
  fund = signal<Fund | null>(null);
  loans = signal<Loan[]>([]);
  isLoading = signal(true);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly loanRepo: LoanRepository,
    private readonly fundRepo: FundRepository,
    private readonly snackBar: MatSnackBar,
  ) {}

  async ngOnInit(): Promise<void> {
    this.fundId = this.route.snapshot.paramMap.get('fundId') ?? '';
    await this.loadData();
  }

  async loadData(): Promise<void> {
    this.isLoading.set(true);
    try {
      const [fund, loans] = await Promise.all([
        this.fundRepo.getById(this.fundId),
        this.loanRepo.getByFund(this.fundId),
      ]);
      this.fund.set(fund);
      this.loans.set(loans);
    } catch (error) {
      console.error('Error loading loans:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  getPaidCount(loan: Loan): number {
    return loan.installments.filter((i) => i.paid).length;
  }

  getProgress(loan: Loan): number {
    return (this.getPaidCount(loan) / loan.installmentCount) * 100;
  }
}
