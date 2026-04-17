import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LoanRepository, ParticipantRepository, FundRepository, PeriodRepository, PaymentRepository } from '../../../../data/repositories';
import { InterestCalculator, DateUtils } from '../../../../core/utils';
import { FundType } from '../../../../core/enums';
import type { Participant, Fund, Period, LoanCalculation } from '../../../../core/models';

@Component({
  selector: 'bf-loan-create',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="page animate-fade-in">
      <div class="page-header">
        <div>
          <h1 class="page-header__title">Nuevo Préstamo</h1>
          @if (fund()) {
            <p class="page-header__subtitle">{{ fund()!.name }}</p>
          }
        </div>
        <a mat-button [routerLink]="['/admin/funds', fundId]">
          <mat-icon>arrow_back</mat-icon>
          Volver
        </a>
      </div>

      <div class="form-container">
        <!-- Available Balance Info -->
        <div class="balance-info">
          <mat-icon>account_balance</mat-icon>
          <div class="balance-details">
            <span class="balance-label">Fondo disponible para préstamos</span>
            <span class="balance-value">S/ {{ availableBalance().toFixed(2) }}</span>
          </div>
        </div>

        <form class="create-form" (ngSubmit)="onSubmit()">
          <!-- Participante -->
          <div class="form-section">
            <h3 class="form-section__title">
              <mat-icon>person</mat-icon>
              Participante
            </h3>
            <mat-form-field appearance="outline">
              <mat-label>Seleccionar participante</mat-label>
              <mat-select [(ngModel)]="selectedParticipantId" name="participant"
                          (ngModelChange)="onParticipantChange()">
                @for (p of participants(); track p.id) {
                  <mat-option [value]="p.id">{{ p.name }}</mat-option>
                }
              </mat-select>
            </mat-form-field>
          </div>

          <!-- Monto y Plazo -->
          <div class="form-section">
            <h3 class="form-section__title">
              <mat-icon>account_balance_wallet</mat-icon>
              Condiciones del Préstamo
            </h3>

            <div class="form-row two-cols">
              <mat-form-field appearance="outline">
                <mat-label>Monto (S/)</mat-label>
                <input matInput type="number" [(ngModel)]="loanAmount"
                       name="amount" min="1" [max]="availableBalance()"
                       (ngModelChange)="recalculate()" required />
                <span matPrefix>S/&nbsp;</span>
                <mat-hint>Máximo: S/ {{ availableBalance().toFixed(2) }}</mat-hint>
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Cuotas (meses)</mat-label>
                <input matInput type="number" [(ngModel)]="installmentCount"
                       name="installments" min="1" [max]="maxInstallments()"
                       (ngModelChange)="recalculate()" required />
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline">
              <mat-label>Mes de inicio</mat-label>
              <mat-select [(ngModel)]="startMonth" name="startMonth"
                          (ngModelChange)="recalculate()">
                @for (m of availableMonths(); track m) {
                  <mat-option [value]="m">{{ m }}</mat-option>
                }
              </mat-select>
            </mat-form-field>
          </div>

          <!-- Cálculo Preview -->
          @if (calculation()) {
            <div class="preview-card">
              <h4>📋 Desglose del Préstamo</h4>
              <div class="calc-grid">
                <div class="calc-item">
                  <span class="calc-label">Monto solicitado</span>
                  <span class="calc-value">S/ {{ loanAmount.toFixed(2) }}</span>
                </div>
                <div class="calc-item">
                  <span class="calc-label">Tasa de interés</span>
                  <span class="calc-value">{{ (fund()!.interestRate * 100).toFixed(0) }}%
                    {{ fund()!.type === FundType.BANQUITO ? 'compuesto' : 'simple' }}
                  </span>
                </div>
                <div class="calc-item">
                  <span class="calc-label">Cuotas</span>
                  <span class="calc-value">{{ installmentCount }} meses</span>
                </div>
                <div class="calc-item highlight">
                  <span class="calc-label">Cuota mensual</span>
                  <span class="calc-value money">S/ {{ calculation()!.monthlyPayment.toFixed(2) }}</span>
                </div>
                <div class="calc-item">
                  <span class="calc-label">Interés generado</span>
                  <span class="calc-value accent">S/ {{ calculation()!.interestGenerated.toFixed(2) }}</span>
                </div>
                <div class="calc-item highlight">
                  <span class="calc-label">Total a pagar</span>
                  <span class="calc-value money bold">S/ {{ calculation()!.totalToPay.toFixed(2) }}</span>
                </div>
              </div>

              @if (calculation()!.installments.length > 0) {
                <div class="installments-preview">
                  <h5>Calendario de pagos</h5>
                  @for (inst of calculation()!.installments; track inst.month; let i = $index) {
                    <div class="installment-row">
                      <span class="inst-num">{{ i + 1 }}</span>
                      <span class="inst-month">{{ inst.month }}</span>
                      <span class="inst-amount">S/ {{ inst.amount.toFixed(2) }}</span>
                    </div>
                  }
                </div>
              }
            </div>
          }

          @if (errorMessage()) {
            <div class="form-error">
              <mat-icon>error_outline</mat-icon>
              {{ errorMessage() }}
            </div>
          }

          <div class="form-actions">
            <a mat-button [routerLink]="['/admin/funds', fundId]">Cancelar</a>
            <button mat-flat-button color="primary" type="submit"
                    [disabled]="isSaving() || !calculation()">
              @if (isSaving()) {
                <mat-spinner diameter="20" />
              } @else {
                <ng-container>Crear Préstamo</ng-container>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./loan-create.component.scss'],
})
export class LoanCreateComponent implements OnInit {
  readonly FundType = FundType;
  fundId = '';
  fund = signal<Fund | null>(null);
  period = signal<Period | null>(null);
  participants = signal<Participant[]>([]);
  availableMonths = signal<string[]>([]);
  maxInstallments = signal(12);
  calculation = signal<LoanCalculation | null>(null);
  availableBalance = signal(0);

  selectedParticipantId = '';
  loanAmount = 0;
  installmentCount = 3;
  startMonth = '';

  isSaving = signal(false);
  errorMessage = signal('');

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly loanRepo: LoanRepository,
    private readonly participantRepo: ParticipantRepository,
    private readonly fundRepo: FundRepository,
    private readonly periodRepo: PeriodRepository,
    private readonly paymentRepo: PaymentRepository,
    private readonly snackBar: MatSnackBar,
  ) {}

  async ngOnInit(): Promise<void> {
    this.fundId = this.route.snapshot.paramMap.get('fundId') ?? '';
    await this.loadData();
  }

  async loadData(): Promise<void> {
    try {
      const fund = await this.fundRepo.getById(this.fundId);
      this.fund.set(fund);

      if (fund) {
        const [period, participants, payments, loans] = await Promise.all([
          this.periodRepo.getById(fund.periodId),
          this.participantRepo.getByFund(this.fundId),
          this.paymentRepo.getByFund(this.fundId),
          this.loanRepo.getByFund(this.fundId),
        ]);

        this.period.set(period);
        this.participants.set(participants);

        // Calculate available balance: total payments received - total loans given out
        const totalCollected = payments.reduce((sum, p) => sum + p.amount, 0);
        const totalLoaned = loans
          .filter((l) => l.status === 'active')
          .reduce((sum, l) => sum + l.amount, 0);
        const balance = Math.max(0, totalCollected - totalLoaned);
        this.availableBalance.set(balance);
        this.loanAmount = balance;

        if (period) {
          this.availableMonths.set(period.months);
          this.maxInstallments.set(period.months.length);
          if (period.months.length > 0) {
            const smartMonth = DateUtils.getSmartCurrentMonth();
            if (period.months.includes(smartMonth)) {
              this.startMonth = smartMonth;
            } else {
              this.startMonth = period.months[0];
            }
          }
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  onParticipantChange(): void {
    this.recalculate();
  }

  recalculate(): void {
    this.errorMessage.set('');
    const fund = this.fund();
    const period = this.period();
    if (!fund || !period || this.loanAmount <= 0 || this.installmentCount <= 0) {
      this.calculation.set(null);
      return;
    }

    const roundedInput = Math.round(this.loanAmount * 100) / 100;
    const roundedBalance = Math.round(this.availableBalance() * 100) / 100;

    if (roundedInput > roundedBalance) {
      this.errorMessage.set(`El monto excede el fondo disponible (S/ ${this.availableBalance().toFixed(2)})`);
      this.calculation.set(null);
      return;
    }

    try {
      const calc = InterestCalculator.calculate(
        fund.type,
        this.loanAmount,
        this.installmentCount,
        fund.interestRate,
        this.startMonth,
        period.months,
      );
      this.calculation.set(calc);
      this.errorMessage.set('');
    } catch (error) {
      this.calculation.set(null);
      this.errorMessage.set(error instanceof Error ? error.message : 'Error en el cálculo');
    }
  }

  async onSubmit(): Promise<void> {
    this.errorMessage.set('');
    const calc = this.calculation();
    if (!calc || !this.selectedParticipantId) {
      this.errorMessage.set('Completa todos los campos.');
      return;
    }

    const roundedInput = Math.round(this.loanAmount * 100) / 100;
    const roundedBalance = Math.round(this.availableBalance() * 100) / 100;

    if (roundedInput > roundedBalance) {
      this.errorMessage.set('El monto excede el fondo disponible.');
      return;
    }

    const participant = this.participants().find((p) => p.id === this.selectedParticipantId);
    if (!participant) return;

    this.isSaving.set(true);
    try {
      await this.loanRepo.create(
        {
          fundId: this.fundId,
          participantId: participant.id,
          participantName: participant.name,
          amount: this.loanAmount,
          installmentCount: this.installmentCount,
          startMonth: this.startMonth,
          isLateEntryLoan: false,
        },
        calc,
      );

      this.snackBar.open('¡Préstamo creado exitosamente!', 'OK', { duration: 3000 });
      this.router.navigate(['/admin/funds', this.fundId]);
    } catch (error) {
      console.error('Error creating loan:', error);
      this.errorMessage.set('Error al crear el préstamo.');
    } finally {
      this.isSaving.set(false);
    }
  }
}
