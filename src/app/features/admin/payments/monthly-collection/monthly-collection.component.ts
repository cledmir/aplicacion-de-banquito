import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import {
  FundRepository,
  PeriodRepository,
  ParticipantRepository,
  LoanRepository,
  PaymentRepository,
} from '../../../../data/repositories';
import { PaymentType, LoanStatus, FundStatus, PaymentMethod } from '../../../../core/enums';
import type { Fund, Period, Participant, Loan, Payment } from '../../../../core/models';

interface CollectionRow {
  participant: Participant;
  options: number;
  contributionDue: number;
  loanPaymentDue: number;
  totalDue: number;
  contributionPaid: boolean;
  loanPaid: boolean;
  activeLoan: Loan | null;
}

@Component({
  selector: 'bf-monthly-collection',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatChipsModule,
  ],
  template: `
    <div class="page animate-fade-in">
      <div class="page-header">
        <div>
          <h1 class="page-header__title">Cobranza Mensual</h1>
          @if (fund()) {
            <p class="page-header__subtitle">{{ fund()!.name }}</p>
          }
        </div>
        <a mat-button [routerLink]="['/admin/funds', fundId]">
          <mat-icon>arrow_back</mat-icon>
          Volver al fondo
        </a>
      </div>

      <!-- Month Selector -->
      <div class="month-selector">
        <mat-form-field appearance="outline">
          <mat-label>Mes de cobro</mat-label>
          <mat-select [(ngModel)]="selectedMonth" name="month"
                      (ngModelChange)="onMonthChange()">
            @for (m of months(); track m) {
              <mat-option [value]="m">{{ m }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        @if (selectedMonth) {
          <div class="month-summary">
            <div class="summary-item">
              <span class="summary-label">Esperado</span>
              <span class="summary-value">S/ {{ totalExpected().toFixed(2) }}</span>
            </div>
            <div class="summary-item collected">
              <span class="summary-label">Cobrado</span>
              <span class="summary-value">S/ {{ totalCollected().toFixed(2) }}</span>
            </div>
            <div class="summary-item pending">
              <span class="summary-label">Pendiente</span>
              <span class="summary-value">S/ {{ (totalExpected() - totalCollected()).toFixed(2) }}</span>
            </div>
          </div>

          @if (hasPendingPayments() && fund()?.status !== FundStatus.CLOSED) {
            <div class="bulk-actions">
              <button mat-flat-button color="primary" class="bulk-btn"
                      (click)="collectAll()" [disabled]="isProcessing()">
                <mat-icon>done_all</mat-icon>
                Cobrar todo pendiente
              </button>
              @if (isProcessing()) {
                <span class="processing-text">Procesando... {{ processedCount() }}/{{ totalToProcess() }}</span>
              }
            </div>
          }
        }
      </div>

      <!-- Collection Table -->
      @if (rows().length > 0) {
        <div class="collection-card">
          <div class="collection-grid header">
            <span>Participante</span>
            <span>Opc.</span>
            <span>Aporte</span>
            <span>Cuota Prést.</span>
            <span>Total</span>
            <span>Acciones</span>
          </div>

          @for (row of rows(); track row.participant.id) {
            <div class="collection-grid row" [class.fully-paid]="row.contributionPaid && (row.loanPaid || !row.activeLoan)">
              <span class="participant-name">{{ row.participant.name }}</span>
              <span>{{ row.options }}</span>
              <div class="payment-cell">
                <span [class.paid]="row.contributionPaid"
                      [class.pending]="!row.contributionPaid">
                  S/ {{ row.contributionDue.toFixed(2) }}
                </span>
                @if (row.contributionPaid) {
                  <mat-icon class="check-icon">check_circle</mat-icon>
                }
              </div>
              <div class="payment-cell">
                @if (row.activeLoan) {
                  <span [class.paid]="row.loanPaid"
                        [class.pending]="!row.loanPaid">
                    S/ {{ row.loanPaymentDue.toFixed(2) }}
                  </span>
                  @if (row.loanPaid) {
                    <mat-icon class="check-icon">check_circle</mat-icon>
                  }
                } @else {
                  <span class="no-loan">—</span>
                }
              </div>
              <span class="total-cell">S/ {{ row.totalDue.toFixed(2) }}</span>
              <div class="action-buttons">
                @if (fund()?.status === FundStatus.CLOSED) {
                  <mat-icon class="closed-lock" title="Fondo cerrado">lock</mat-icon>
                } @else {
                  @if (!row.contributionPaid) {
                    <button mat-stroked-button class="pay-btn"
                            (click)="registerContribution(row)">
                      <mat-icon>payments</mat-icon>
                      Aporte
                    </button>
                  }
                  @if (row.activeLoan && !row.loanPaid) {
                    <button mat-stroked-button class="pay-btn loan"
                            (click)="registerLoanPayment(row)">
                      <mat-icon>credit_card</mat-icon>
                      Cuota
                    </button>
                  }
                  @if (row.contributionPaid && (row.loanPaid || !row.activeLoan)) {
                    <span class="all-paid-badge">✅ Completo</span>
                  }
                }
              </div>
            </div>
          }
        </div>
      } @else if (selectedMonth) {
        <div class="empty-state">
          <span class="empty-state__icon">📋</span>
          <h3>No hay participantes</h3>
          <p>Agrega participantes al fondo primero</p>
        </div>
      }
    </div>
  `,
  styleUrls: ['./monthly-collection.component.scss'],
})
export class MonthlyCollectionComponent implements OnInit {
  readonly FundStatus = FundStatus;
  fundId = '';
  fund = signal<Fund | null>(null);
  period = signal<Period | null>(null);
  months = signal<string[]>([]);
  rows = signal<CollectionRow[]>([]);
  totalExpected = signal(0);
  totalCollected = signal(0);
  hasPendingPayments = signal(false);
  isProcessing = signal(false);
  processedCount = signal(0);
  totalToProcess = signal(0);

  selectedMonth = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly fundRepo: FundRepository,
    private readonly periodRepo: PeriodRepository,
    private readonly participantRepo: ParticipantRepository,
    private readonly loanRepo: LoanRepository,
    private readonly paymentRepo: PaymentRepository,
    private readonly snackBar: MatSnackBar,
  ) {}

  async ngOnInit(): Promise<void> {
    this.fundId = this.route.snapshot.paramMap.get('fundId') ?? '';
    await this.loadFundData();
  }

  async loadFundData(): Promise<void> {
    try {
      const fund = await this.fundRepo.getById(this.fundId);
      this.fund.set(fund);

      if (fund) {
        const period = await this.periodRepo.getById(fund.periodId);
        this.period.set(period);
        if (period) {
          this.months.set(period.months);
          if (period.months.length > 0) {
            this.selectedMonth = period.months[0];
            await this.loadMonthData();
          }
        }
      }
    } catch (error) {
      console.error('Error loading fund:', error);
    }
  }

  async onMonthChange(): Promise<void> {
    await this.loadMonthData();
  }

  async loadMonthData(): Promise<void> {
    if (!this.selectedMonth || !this.fund()) return;

    try {
      const [participants, loans, payments] = await Promise.all([
        this.participantRepo.getByFund(this.fundId),
        this.loanRepo.getByFund(this.fundId),
        this.paymentRepo.getByFundAndMonth(this.fundId, this.selectedMonth),
      ]);

      const fund = this.fund()!;
      const collectionRows: CollectionRow[] = participants.map((p) => {
        const options = this.getOptionsForMonth(p, this.selectedMonth);
        const contributionDue = options * fund.optionValue;

        const activeLoan = loans.find(
          (l) => l.participantId === p.id &&
            l.status === 'active' &&
            l.installments.some((inst) => inst.month === this.selectedMonth),
        ) ?? null;

        const loanPaymentDue = activeLoan?.monthlyPayment ?? 0;

        const contributionPaid = payments.some(
          (pay) => pay.participantId === p.id && pay.type === PaymentType.CONTRIBUTION,
        );
        const loanPaid = activeLoan
          ? payments.some(
              (pay) => pay.participantId === p.id && pay.type === PaymentType.LOAN_PAYMENT,
            )
          : true;

        return {
          participant: p,
          options,
          contributionDue,
          loanPaymentDue,
          totalDue: contributionDue + loanPaymentDue,
          contributionPaid,
          loanPaid,
          activeLoan,
        };
      });

      this.rows.set(collectionRows);

      const expected = collectionRows.reduce((sum, r) => sum + r.totalDue, 0);
      const collected = collectionRows.reduce((sum, r) => {
        let paid = 0;
        if (r.contributionPaid) paid += r.contributionDue;
        if (r.loanPaid && r.activeLoan) paid += r.loanPaymentDue;
        return sum + paid;
      }, 0);

      this.totalExpected.set(expected);
      this.totalCollected.set(collected);

      // Check if there are pending payments
      const hasPending = collectionRows.some(
        (r) => !r.contributionPaid || (r.activeLoan && !r.loanPaid),
      );
      this.hasPendingPayments.set(hasPending);
    } catch (error) {
      console.error('Error loading month data:', error);
    }
  }

  async collectAll(): Promise<void> {
    const pending = this.rows().filter(
      (r) => !r.contributionPaid || (r.activeLoan && !r.loanPaid),
    );

    let totalOps = pending.reduce((sum, r) => {
      let ops = 0;
      if (!r.contributionPaid) ops++;
      if (r.activeLoan && !r.loanPaid) ops++;
      return sum + ops;
    }, 0);

    this.totalToProcess.set(totalOps);
    this.processedCount.set(0);
    this.isProcessing.set(true);

    try {
      for (const row of pending) {
        if (!row.contributionPaid) {
          await this.paymentRepo.create({
            fundId: this.fundId,
            participantId: row.participant.id,
            participantName: row.participant.name,
            type: PaymentType.CONTRIBUTION,
            loanId: null,
            month: this.selectedMonth,
            amount: row.contributionDue,
            method: PaymentMethod.CASH,
          });
          this.processedCount.update((c) => c + 1);
        }

        if (row.activeLoan && !row.loanPaid) {
          await this.paymentRepo.create({
            fundId: this.fundId,
            participantId: row.participant.id,
            participantName: row.participant.name,
            type: PaymentType.LOAN_PAYMENT,
            loanId: row.activeLoan.id,
            month: this.selectedMonth,
            amount: row.loanPaymentDue,
            method: PaymentMethod.CASH,
          });
          await this.loanRepo.payInstallment(row.activeLoan.id, this.selectedMonth);
          this.processedCount.update((c) => c + 1);
        }
      }

      this.snackBar.open('✅ Todos los cobros registrados', 'OK', { duration: 3000 });
      await this.loadMonthData();
    } catch (error) {
      console.error('Error collecting all:', error);
      this.snackBar.open('Error al procesar cobros', 'OK', { duration: 3000 });
    } finally {
      this.isProcessing.set(false);
    }
  }

  async registerContribution(row: CollectionRow): Promise<void> {
    try {
      await this.paymentRepo.create({
        fundId: this.fundId,
        participantId: row.participant.id,
        participantName: row.participant.name,
        type: PaymentType.CONTRIBUTION,
        loanId: null,
        month: this.selectedMonth,
        amount: row.contributionDue,
        method: PaymentMethod.CASH,
      });
      this.snackBar.open(`Aporte de ${row.participant.name} registrado`, 'OK', { duration: 2000 });
      await this.loadMonthData();
    } catch (error) {
      console.error('Error registering payment:', error);
      this.snackBar.open('Error al registrar pago', 'OK', { duration: 3000 });
    }
  }

  async registerLoanPayment(row: CollectionRow): Promise<void> {
    if (!row.activeLoan) return;

    try {
      await this.paymentRepo.create({
        fundId: this.fundId,
        participantId: row.participant.id,
        participantName: row.participant.name,
        type: PaymentType.LOAN_PAYMENT,
        loanId: row.activeLoan.id,
        month: this.selectedMonth,
        amount: row.loanPaymentDue,
        method: PaymentMethod.CASH,
      });

      await this.loanRepo.payInstallment(row.activeLoan.id, this.selectedMonth);

      this.snackBar.open(`Cuota de ${row.participant.name} registrada`, 'OK', { duration: 2000 });
      await this.loadMonthData();
    } catch (error) {
      console.error('Error registering loan payment:', error);
      this.snackBar.open('Error al registrar cuota', 'OK', { duration: 3000 });
    }
  }

  private getOptionsForMonth(participant: Participant, month: string): number {
    if (participant.optionsPerMonth[month] !== undefined) {
      return participant.optionsPerMonth[month];
    }
    const values = Object.values(participant.optionsPerMonth);
    return values.length > 0 ? values[values.length - 1] : 0;
  }
}
