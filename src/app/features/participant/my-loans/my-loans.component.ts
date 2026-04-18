import { Component, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../data/services';
import { FundRepository, ParticipantRepository, LoanRepository } from '../../../data/repositories';
import { LoanStatus } from '../../../core/enums';
import type { Loan, Fund } from '../../../core/models';

interface LoanWithFund extends Loan {
  fundName: string;
}

@Component({
  selector: 'bf-my-loans',
  standalone: true,
  imports: [RouterLink, DatePipe, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  template: `
    <div class="page animate-fade-in">
      <div class="page-header">
        <h1 class="page-title">Mis Préstamos</h1>
        <a mat-button routerLink="/participant/dashboard">
          <mat-icon>arrow_back</mat-icon> Volver al inicio
        </a>
      </div>

      @if (isLoading()) {
        <div class="loading-state" style="display:flex; flex-direction:column; align-items:center; opacity:0.7; padding:4rem;">
          <mat-spinner diameter="40"></mat-spinner>
          <p style="margin-top:1rem;">Cargando tus préstamos...</p>
        </div>
      } @else if (loans().length > 0) {
        @for (loan of loans(); track loan.id) {
          <div class="loan-card" [class.paid]="loan.status === 'paid'">
            <div class="loan-card__header">
              <div class="loan-fund">
                <mat-icon>account_balance</mat-icon>
                <span>{{ loan.fundName }}</span>
              </div>
              <span class="loan-badge" [class]="loan.status">
                {{ loan.status === 'active' ? '⏳ Activo' : '✅ Pagado' }}
              </span>
            </div>

            <div class="loan-card__body">
              <div class="loan-info-grid">
                <div class="info-item">
                  <span class="info-label">Monto prestado</span>
                  <span class="info-value money">S/ {{ loan.amount.toFixed(2) }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Cuota mensual</span>
                  <span class="info-value">S/ {{ loan.monthlyPayment.toFixed(2) }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Total a pagar</span>
                  <span class="info-value">S/ {{ loan.totalToPay.toFixed(2) }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Interés</span>
                  <span class="info-value accent">S/ {{ loan.interestGenerated.toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <!-- Installments -->
            <div class="installments-section">
              <h4>Cuotas ({{ getPaidCount(loan) }}/{{ loan.installmentCount }})</h4>
              <div class="installments-grid">
                @for (inst of loan.installments; track inst.month; let i = $index) {
                  <div class="inst-item" [class.paid]="inst.paid" [class.pending]="!inst.paid">
                    <span class="inst-num">{{ i + 1 }}</span>
                    <span class="inst-month">{{ inst.month }}</span>
                    <span class="inst-amount">S/ {{ inst.amount.toFixed(2) }}</span>
                    <mat-icon class="inst-status">
                      {{ inst.paid ? 'check_circle' : 'radio_button_unchecked' }}
                    </mat-icon>
                  </div>
                }
              </div>
            </div>

            <!-- Progress -->
            <div class="loan-progress">
              <div class="progress-bar">
                <div class="progress-fill" [style.width.%]="getProgress(loan)"></div>
              </div>
              <span class="progress-text">{{ getProgress(loan).toFixed(0) }}% completado</span>
            </div>
          </div>
        }
      } @else {
        <div class="empty-state">
          <span class="empty-icon">💰</span>
          <h3>No tienes préstamos</h3>
          <p>Solicita un préstamo a través del administrador de tu fondo</p>
        </div>
      }
    </div>
  `,
  styleUrls: ['./my-loans.component.scss'],
})
export class MyLoansComponent implements OnInit {
  isLoading = signal(true);
  loans = signal<LoanWithFund[]>([]);

  constructor(
    private readonly auth: AuthService,
    private readonly fundRepo: FundRepository,
    private readonly participantRepo: ParticipantRepository,
    private readonly loanRepo: LoanRepository,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadData();
  }

  async loadData(): Promise<void> {
    this.isLoading.set(true);
    try {
      const user = this.auth.user();
      if (!user) return;

      const funds = await this.fundRepo.getAll();
      const allLoans: LoanWithFund[] = [];

      for (const fund of funds) {
        const participants = await this.participantRepo.getByFund(fund.id);
        const myParticipation = participants.find((p) => p.userId === user.uid);
        if (!myParticipation) continue;

        const loans = await this.loanRepo.getByParticipant(myParticipation.id);
        allLoans.push(...loans.map((l) => ({ ...l, fundName: fund.name })));
      }

      // Sort: active first, then by date
      allLoans.sort((a, b) => {
        if (a.status !== b.status) return a.status === LoanStatus.ACTIVE ? -1 : 1;
        return b.createdAt.getTime() - a.createdAt.getTime();
      });

      this.loans.set(allLoans);
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
