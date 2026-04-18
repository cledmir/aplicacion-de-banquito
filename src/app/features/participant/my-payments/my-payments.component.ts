import { Component, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../data/services';
import { FundRepository, ParticipantRepository, PaymentRepository } from '../../../data/repositories';
import { PaymentType } from '../../../core/enums';
import type { Payment } from '../../../core/models';

interface PaymentWithFund extends Payment {
  fundName: string;
}

@Component({
  selector: 'bf-my-payments',
  standalone: true,
  imports: [RouterLink, DatePipe, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  template: `
    <div class="page animate-fade-in">
      <div class="page-header">
        <h1 class="page-title">Mis Pagos</h1>
        <a mat-button routerLink="/participant/dashboard">
          <mat-icon>arrow_back</mat-icon> Volver al inicio
        </a>
      </div>

      @if (isLoading()) {
        <div class="loading-state" style="display:flex; flex-direction:column; align-items:center; opacity:0.7; padding:4rem;">
          <mat-spinner diameter="40"></mat-spinner>
          <p style="margin-top:1rem;">Cargando tus pagos...</p>
        </div>
      } @else {

      <!-- Summary -->
      <div class="summary-bar">
        <div class="summary-item">
          <mat-icon>savings</mat-icon>
          <div>
            <span class="sum-label">Total Aportes</span>
            <span class="sum-value green">S/ {{ totalContributions().toFixed(2) }}</span>
          </div>
        </div>
        <div class="summary-item">
          <mat-icon>credit_card</mat-icon>
          <div>
            <span class="sum-label">Total Cuotas</span>
            <span class="sum-value blue">S/ {{ totalLoanPayments().toFixed(2) }}</span>
          </div>
        </div>
        <div class="summary-item">
          <mat-icon>receipt_long</mat-icon>
          <div>
            <span class="sum-label">Total Pagado</span>
            <span class="sum-value">S/ {{ (totalContributions() + totalLoanPayments()).toFixed(2) }}</span>
          </div>
        </div>
      </div>

      @if (payments().length > 0) {
        <div class="payments-list">
          @for (pay of payments(); track pay.id) {
            <div class="payment-row">
              <div class="payment-icon" [class.contribution]="pay.type === PaymentType.CONTRIBUTION"
                                        [class.loan-pay]="pay.type === PaymentType.LOAN_PAYMENT">
                <mat-icon>{{ pay.type === PaymentType.CONTRIBUTION ? 'savings' : 'credit_card' }}</mat-icon>
              </div>
              <div class="payment-info">
                <span class="pay-desc">
                  {{ pay.type === PaymentType.CONTRIBUTION ? 'Aporte mensual' : 'Cuota de préstamo' }}
                </span>
                <span class="pay-detail">{{ pay.fundName }} · {{ pay.month }}</span>
              </div>
              <div class="payment-right">
                <span class="pay-amount">S/ {{ pay.amount.toFixed(2) }}</span>
                <span class="pay-date">{{ pay.createdAt | date:'dd/MM/yy' }}</span>
              </div>
            </div>
          }
        </div>
      } @else {
        <div class="empty-state">
          <span class="empty-icon">📄</span>
          <h3>Sin pagos registrados</h3>
          <p>Tus pagos aparecerán aquí cuando el administrador los registre</p>
        </div>
      }
      }
    </div>
  `,
  styleUrls: ['./my-payments.component.scss'],
})
export class MyPaymentsComponent implements OnInit {
  readonly PaymentType = PaymentType;
  isLoading = signal(true);
  payments = signal<PaymentWithFund[]>([]);
  totalContributions = signal(0);
  totalLoanPayments = signal(0);

  constructor(
    private readonly auth: AuthService,
    private readonly fundRepo: FundRepository,
    private readonly participantRepo: ParticipantRepository,
    private readonly paymentRepo: PaymentRepository,
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
      const allPayments: PaymentWithFund[] = [];

      for (const fund of funds) {
        const participants = await this.participantRepo.getByFund(fund.id);
        const myParticipation = participants.find((p) => p.userId === user.uid);
        if (!myParticipation) continue;

        const payments = await this.paymentRepo.getByParticipant(myParticipation.id);
        allPayments.push(...payments.map((p) => ({ ...p, fundName: fund.name })));
      }

      allPayments.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      this.payments.set(allPayments);

      const contributions = allPayments
        .filter((p) => p.type === PaymentType.CONTRIBUTION)
        .reduce((sum, p) => sum + p.amount, 0);
      const loanPays = allPayments
        .filter((p) => p.type === PaymentType.LOAN_PAYMENT)
        .reduce((sum, p) => sum + p.amount, 0);

      this.totalContributions.set(contributions);
      this.totalLoanPayments.set(loanPays);
    } catch (error) {
      console.error('Error loading payments:', error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
