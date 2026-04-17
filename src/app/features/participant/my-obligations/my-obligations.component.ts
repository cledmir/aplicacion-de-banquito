import { Component, signal, OnInit, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../../data/services';
import { 
  FundRepository, 
  ParticipantRepository, 
  LoanRepository, 
  PaymentRepository, 
  PeriodRepository 
} from '../../../data/repositories';
import { PaymentType, LoanStatus } from '../../../core/enums';
import type { Fund, Participant, Loan, Period } from '../../../core/models';

interface ObligationLoan {
  loanId: string;
  amount: number;
  paid: boolean;
}

interface FundObligation {
  fund: Fund;
  monthlyContribution: number;
  contributionPaid: boolean;
  loans: ObligationLoan[];
  fundTotal: number;
}

@Component({
  selector: 'bf-my-obligations',
  standalone: true,
  imports: [
    RouterLink, 
    MatButtonModule, 
    MatIconModule, 
    MatSelectModule, 
    MatFormFieldModule, 
    FormsModule
  ],
  template: `
    <div class="page animate-fade-in">
      <div class="page-header">
        <button mat-icon-button routerLink="/participant" class="back-btn">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <h2>Mis Cuotas Mensuales</h2>
      </div>

      @if (isLoading()) {
        <div class="loading-state">Calculando deudas...</div>
      } @else if (availableMonths().length > 0) {
        
        <div class="month-selector-container">
          <mat-form-field appearance="outline" class="month-select">
            <mat-label>Selecciona un Mes</mat-label>
            <mat-select [ngModel]="selectedMonth()" (ngModelChange)="loadMonthData($event)">
              @for (month of availableMonths(); track month) {
                <mat-option [value]="month">{{ month }}</mat-option>
              }
            </mat-select>
          </mat-form-field>
        </div>

        @if (selectedMonth()) {
          <div class="global-total-card">
            <span class="global-total-label">Deuda Total de {{ selectedMonth() }}</span>
            <span class="global-total-value">S/ {{ globalTotal().toFixed(2) }}</span>
            <p class="global-total-desc">
              Esta es la suma de todos tus aportes y cuotas de préstamos para el mes seleccionado.
            </p>
          </div>

          <!-- Breakdown by Fund -->
          <div class="funds-grid">
            @for (fo of fundObligations(); track fo.fund.id) {
              <div class="fund-card">
                <div class="fund-card-header">
                  <span class="fund-emoji">{{ fo.fund.type === 'banquito' ? '🏦' : '🧺' }}</span>
                  <div>
                    <h3>{{ fo.fund.name }}</h3>
                    <span class="fund-detail">Aporte fijo</span>
                  </div>
                </div>

                <div class="fund-card-body">
                  <div class="line-item" [class.paid]="fo.contributionPaid">
                    <span class="item-label">Aporte del Mes</span>
                    <span class="item-value">S/ {{ fo.monthlyContribution.toFixed(2) }}</span>
                    @if (fo.contributionPaid) {
                      <mat-icon class="check-icon">check_circle</mat-icon>
                    }
                  </div>

                  @for (loan of fo.loans; track loan.loanId; let i = $index) {
                    <div class="line-item loan-item" [class.paid]="loan.paid">
                      <span class="item-label">
                        <mat-icon class="loan-icon">credit_card</mat-icon>
                        Préstamo #{{ i + 1 }}
                      </span>
                      <span class="item-value">S/ {{ loan.amount.toFixed(2) }}</span>
                      @if (loan.paid) {
                        <mat-icon class="check-icon">check_circle</mat-icon>
                      }
                    </div>
                  }
                </div>

                <div class="fund-card-footer">
                  <span>Total en este fondo</span>
                  <span class="fund-total">S/ {{ fo.fundTotal.toFixed(2) }}</span>
                </div>
              </div>
            }
          </div>
          
          @if (fundObligations().length === 0) {
            <div class="empty-state">
              <span class="empty-icon">🎉</span>
              <h3>Sin obligaciones</h3>
              <p>No tienes que pagar nada en el mes de {{ selectedMonth() }}.</p>
            </div>
          }
        }
      } @else {
        <div class="empty-state">
          <span class="empty-icon">📋</span>
          <h3>Sin actividad</h3>
          <p>Aún no hay periodos o fondos activos registrados para mostrar cuotas.</p>
        </div>
      }
    </div>
  `,
  styleUrls: ['./my-obligations.component.scss'],
})
export class MyObligationsComponent implements OnInit {
  isLoading = signal(true);
  availableMonths = signal<string[]>([]);
  selectedMonth = signal<string>('');

  // All participant associations
  private userParticipations: { fund: Fund; participant: Participant; period: Period }[] = [];
  
  // Specific month data
  fundObligations = signal<FundObligation[]>([]);
  globalTotal = computed(() => {
    return this.fundObligations().reduce((sum, fo) => sum + fo.fundTotal, 0);
  });

  constructor(
    private readonly auth: AuthService,
    private readonly fundRepo: FundRepository,
    private readonly participantRepo: ParticipantRepository,
    private readonly loanRepo: LoanRepository,
    private readonly paymentRepo: PaymentRepository,
    private readonly periodRepo: PeriodRepository
  ) {}

  async ngOnInit(): Promise<void> {
    await this.initializeData();
  }

  private async initializeData(): Promise<void> {
    this.isLoading.set(true);
    try {
      const user = this.auth.user();
      if (!user) return;

      const funds = await this.fundRepo.getAll();
      const allMonthsSet = new Set<string>();
      const participations = [];

      for (const fund of funds) {
        const participants = await this.participantRepo.getByFund(fund.id);
        const myP = participants.find((p) => p.userId === user.uid);
        if (!myP) continue;

        const period = await this.periodRepo.getById(fund.periodId);
        if (period) {
          participations.push({ fund, participant: myP, period });
          period.months.forEach(m => allMonthsSet.add(m));
        }
      }

      this.userParticipations = participations;

      // Extract unique months in chronological order if possible (simplified by Set insertion order usually matching creation)
      const months = Array.from(allMonthsSet);
      this.availableMonths.set(months);

      if (months.length > 0) {
        // Default to the first available month (or a matching current month logic if we had one)
        this.loadMonthData(months[0]);
      }
    } catch (error) {
      console.error('Error initializing obligations view', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async loadMonthData(month: string): Promise<void> {
    this.selectedMonth.set(month);
    
    try {
      const obligations: FundObligation[] = [];

      for (const pLink of this.userParticipations) {
        const { fund, participant, period } = pLink;
        
        // Ensure the selected month is part of this fund's period
        if (!period.months.includes(month)) continue;

        // Is it the final month? (The final month does not collect fixed contributions)
        const isFinalMonth = period.months[period.months.length - 1] === month;

        // Calculate contribution due
        const options = Object.values(participant.optionsPerMonth);
        const currentOptions = options.length > 0 ? options[options.length - 1] : 0;
        const monthlyContribution = isFinalMonth ? 0 : currentOptions * fund.optionValue;

        // Fetch payments and loans for this participant
        const [loans, payments] = await Promise.all([
          this.loanRepo.getByParticipant(participant.id),
          this.paymentRepo.getByParticipant(participant.id),
        ]);

        // Has the contribution been paid for this month?
        const contributionPaid = payments.some(
          (p) => p.type === PaymentType.CONTRIBUTION && p.month === month
        );

        // Calculate loan obligations for this month
        const obligationLoans: ObligationLoan[] = [];
        let totalLoanDue = 0;

        for (const loan of loans) {
          if (loan.status === LoanStatus.PAID) {
             // Let's also check if it has a paid installment in this month to show historically
             const inst = loan.installments.find(i => i.month === month);
             if (inst) {
                obligationLoans.push({
                   loanId: loan.id,
                   amount: inst.amount,
                   paid: inst.paid
                });
                if (!inst.paid) totalLoanDue += inst.amount;
             }
             continue;
          }

          // Active loans
          const targetInstallment = loan.installments.find(i => i.month === month);
          if (targetInstallment) {
            obligationLoans.push({
              loanId: loan.id,
              amount: targetInstallment.amount,
              paid: targetInstallment.paid
            });
            if (!targetInstallment.paid) {
               totalLoanDue += targetInstallment.amount;
            }
          }
        }

        // Fund total based strictly on what forms the "current obligation/pending balance" or totally historically?
        // Let's compute fundTotal as the sum of WHAT IS DUE. If paid, it's 0.
        const pendingContribution = contributionPaid ? 0 : monthlyContribution;
        const fundTotal = pendingContribution + totalLoanDue;

        // Even if fundTotal == 0 (fully paid), we want to show it? Yes, but maybe grayed out.
        obligations.push({
          fund,
          monthlyContribution,
          contributionPaid,
          loans: obligationLoans,
          fundTotal
        });
      }

      this.fundObligations.set(obligations);
    } catch (error) {
      console.error('Error loading month data', error);
    }
  }
}
