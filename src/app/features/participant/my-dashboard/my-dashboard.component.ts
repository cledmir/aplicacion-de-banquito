import { Component, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../data/services';
import { FundRepository, ParticipantRepository, LoanRepository, PaymentRepository, PeriodRepository } from '../../../data/repositories';
import { LoanStatus, PaymentType } from '../../../core/enums';
import type { Fund, Participant, Loan, Payment, Period } from '../../../core/models';

interface FundSummary {
  fund: Fund;
  period: Period | null;
  participant: Participant;
  options: number;
  monthlyContribution: number;
  activeLoans: number;
  totalLoanDebt: number;
  totalContributed: number;
  projectedTotalContribution: number;
  interestEarned: number;
  interestPaid: number;
  interestPerOption: number;
  netInterestProfit: number;
  projectedReturn: number;
}

@Component({
  selector: 'bf-my-dashboard',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule],
  template: `
    <div class="page animate-fade-in">
      <div class="welcome-section">
        <h1 class="welcome-title">¡Hola, {{ userName() }}! 👋</h1>
        <p class="welcome-sub">Tu resumen de participación</p>
      </div>

      <!-- KPIs -->
      <div class="kpi-grid">
        <div class="kpi-card green">
          <mat-icon>savings</mat-icon>
          <div class="kpi-info">
            <span class="kpi-value">S/ {{ totalContributed().toFixed(2) }}</span>
            <span class="kpi-label">Total Aportado</span>
          </div>
        </div>
        <div class="kpi-card gold">
          <mat-icon>trending_up</mat-icon>
          <div class="kpi-info">
            <span class="kpi-value">S/ {{ totalInterest().toFixed(2) }}</span>
            <span class="kpi-label">Ganancia por Intereses</span>
          </div>
        </div>
        <div class="kpi-card blue">
          <mat-icon>account_balance</mat-icon>
          <div class="kpi-info">
            <!-- Representa su patrimonio en tiempo real -->
            <span class="kpi-value">S/ {{ totalProjected().toFixed(2) }}</span>
            <span class="kpi-label">Tu Dinero a la Fecha</span>
          </div>
        </div>
        <div class="kpi-card purple">
          <mat-icon>credit_card</mat-icon>
          <div class="kpi-info">
            <span class="kpi-value">{{ totalActiveLoans() }}</span>
            <span class="kpi-label">Préstamos Activos</span>
          </div>
        </div>
      </div>

      <!-- Profit Summary -->
      @if (fundSummaries().length > 0) {
        <div class="profit-card">
          <div class="profit-header">
            <mat-icon>insights</mat-icon>
            <h3>Tu Ganancia Actual</h3>
          </div>
          <div class="profit-breakdown">
            <div class="profit-row">
              <span class="pb-label">Aporte realizado hasta ahora</span>
              <span class="pb-value">S/ {{ totalContributed().toFixed(2) }}</span>
            </div>
            <div class="profit-row">
              <span class="pb-label">Aporte total esperado al final</span>
              <span class="pb-value">S/ {{ totalProjectedContribution().toFixed(2) }}</span>
            </div>
            <div class="profit-row">
              <span class="pb-label">Intereses asegurados (por tus opciones)</span>
              <span class="pb-value accent">+ S/ {{ totalInterest().toFixed(2) }}</span>
            </div>
            <div class="profit-row">
              <span class="pb-label">Intereses que pagarás (por tus préstamos)</span>
              <span class="pb-value warn">- S/ {{ totalInterestPaid().toFixed(2) }}</span>
            </div>
            <div class="profit-row">
              <span class="pb-label" [class.accent]="totalNetProfit() >= 0" [class.warn]="totalNetProfit() < 0">
                👉 Utilidad Neta
              </span>
              <span class="pb-value" [class.accent]="totalNetProfit() >= 0" [class.warn]="totalNetProfit() < 0">
                S/ {{ totalNetProfit().toFixed(2) }}
              </span>
            </div>
            <div class="divider"></div>
            <div class="profit-row total highlight">
              <span class="pb-label">Aporte Final + Ganancias 🏆</span>
              <span class="pb-value total">S/ {{ (totalProjectedContribution() + totalNetProfit()).toFixed(2) }}</span>
            </div>
          </div>
          <p class="profit-note">
            💡 El monto final es tu Aporte Total más tu Utilidad Neta. Si el número es mayor a tu Aporte Total, estás ganando dinero.
          </p>
        </div>
      }

      <!-- Funds -->
      @for (fs of fundSummaries(); track fs.fund.id) {
        <div class="fund-card">
          <div class="fund-card__header">
            <span class="fund-emoji">{{ fs.fund.type === 'banquito' ? '🏦' : '🧺' }}</span>
            <div>
              <h3 class="fund-name">{{ fs.fund.name }}</h3>
              <span class="fund-type">{{ fs.fund.type === 'banquito' ? 'Banquito' : 'Canastita' }} · {{ (fs.fund.interestRate * 100).toFixed(0) }}%</span>
            </div>
          </div>
          <div class="fund-card__stats">
            <div class="mini-stat">
              <span class="mini-label">Opciones</span>
              <span class="mini-value">{{ fs.options }}</span>
            </div>
            <div class="mini-stat">
              <span class="mini-label">Rendimiento/Opción</span>
              <span class="mini-value accent">S/ {{ fs.interestPerOption.toFixed(2) }}</span>
            </div>
            <div class="mini-stat">
              <span class="mini-label">Aporte/mes</span>
              <span class="mini-value money">S/ {{ fs.monthlyContribution.toFixed(2) }}</span>
            </div>
            <div class="mini-stat">
              <span class="mini-label">Aportado</span>
              <span class="mini-value money">S/ {{ fs.totalContributed.toFixed(2) }}</span>
            </div>
            <div class="mini-stat">
              <span class="mini-label">Ganancia Bruta</span>
              <span class="mini-value accent">S/ {{ fs.interestEarned.toFixed(2) }}</span>
            </div>
            <div class="mini-stat">
              <span class="mini-label" [class.accent]="fs.netInterestProfit >= 0" [class.warn]="fs.netInterestProfit < 0">Utilidad Neta</span>
              <span class="mini-value" [class.accent]="fs.netInterestProfit >= 0" [class.warn]="fs.netInterestProfit < 0">
                S/ {{ fs.netInterestProfit.toFixed(2) }}
              </span>
            </div>
            <div class="mini-stat highlight">
              <span class="mini-label">Tu Dinero a la Fecha</span>
              <span class="mini-value">S/ {{ fs.projectedReturn.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      }

      @if (fundSummaries().length === 0 && !isLoading()) {
        <div class="empty-state">
          <span class="empty-icon">📋</span>
          <h3>No estás en ningún fondo</h3>
          <p>Contacta al administrador para que te agregue a un fondo</p>
        </div>
      }

      <!-- Quick Actions -->
      @if (fundSummaries().length > 0) {
        <div class="quick-actions-section">
          <a mat-flat-button color="primary" routerLink="/participant/simulator" class="action-btn">
            <mat-icon>calculate</mat-icon>
            Simular Préstamo
          </a>
          <a mat-stroked-button routerLink="/participant/loans" class="action-btn">
            <mat-icon>account_balance_wallet</mat-icon>
            Mis Préstamos
          </a>
          <a mat-stroked-button routerLink="/participant/payments" class="action-btn">
            <mat-icon>receipt_long</mat-icon>
            Mis Pagos
          </a>
        </div>
      }
    </div>
  `,
  styleUrls: ['./my-dashboard.component.scss'],
})
export class MyDashboardComponent implements OnInit {
  userName = signal('');
  fundSummaries = signal<FundSummary[]>([]);
  totalContributed = signal(0);
  totalProjectedContribution = signal(0);
  totalInterest = signal(0);
  totalInterestPaid = signal(0);
  totalNetProfit = signal(0);
  totalProjected = signal(0);
  totalDebt = signal(0);
  totalActiveLoans = signal(0);
  isLoading = signal(true);

  constructor(
    private readonly auth: AuthService,
    private readonly fundRepo: FundRepository,
    private readonly participantRepo: ParticipantRepository,
    private readonly loanRepo: LoanRepository,
    private readonly paymentRepo: PaymentRepository,
    private readonly periodRepo: PeriodRepository,
  ) {}

  async ngOnInit(): Promise<void> {
    const user = this.auth.user();
    this.userName.set(user?.displayName ?? 'Participante');
    await this.loadData();
  }

  async loadData(): Promise<void> {
    this.isLoading.set(true);
    try {
      const user = this.auth.user();
      if (!user) return;

      const funds = await this.fundRepo.getAll();
      const summaries: FundSummary[] = [];
      let totalContributed = 0;
      let totalProjectedContribution = 0;
      let totalInterest = 0;
      let totalInterestPaid = 0;
      let totalDebt = 0;
      let totalActive = 0;

      for (const fund of funds) {
        const participants = await this.participantRepo.getByFund(fund.id);
        const myParticipation = participants.find((p) => p.userId === user.uid);
        if (!myParticipation) continue;

        const [loans, payments, allLoans, period] = await Promise.all([
          this.loanRepo.getByParticipant(myParticipation.id),
          this.paymentRepo.getByParticipant(myParticipation.id),
          this.loanRepo.getByFund(fund.id),
          this.periodRepo.getById(fund.periodId),
        ]);

        const options = Object.values(myParticipation.optionsPerMonth);
        const currentOptions = options.length > 0 ? options[options.length - 1] : 0;
        const monthly = currentOptions * fund.optionValue;

        // Total contributed by this participant
        const contributed = payments
          .filter((p) => p.type === PaymentType.CONTRIBUTION)
          .reduce((sum, p) => sum + p.amount, 0);

        // Interest earned: participant's share of ALL fund interest
        const totalFundInterest = allLoans.reduce((sum, l) => sum + l.interestGenerated, 0);
        const totalFundOptions = participants.reduce((sum, p) => {
          const opts = Object.values(p.optionsPerMonth);
          return sum + (opts.length > 0 ? opts[opts.length - 1] : 0);
        }, 0);
        const interestShare = totalFundOptions > 0
          ? (currentOptions / totalFundOptions) * totalFundInterest
          : 0;
        const interestPerOption = totalFundOptions > 0 ? totalFundInterest / totalFundOptions : 0;
        
        // Interest paid by THIS participant
        const interestPaid = loans.reduce((sum, l) => sum + l.interestGenerated, 0);
        const netInterestProfit = interestShare - interestPaid;

        // Active loan debt
        const activeLoans = loans.filter((l) => l.status === LoanStatus.ACTIVE);
        const debt = activeLoans.reduce((sum, l) => {
          const remaining = l.installments.filter((i) => !i.paid).length * l.monthlyPayment;
          return sum + remaining;
        }, 0);

        // En el último mes no se cobra la mensualidad de aporte
        const monthsCount = period ? Math.max(1, period.months.length - 1) : 1;
        const projectedTotalContribution = monthly * monthsCount;
        
        // Lo acumulado AL MOMENTO (aportes pagados + ganancia neta generada, ignorando deudas de préstamos)
        const currentBalance = contributed + netInterestProfit;

        summaries.push({
          fund,
          period,
          participant: myParticipation,
          options: currentOptions,
          monthlyContribution: monthly,
          activeLoans: activeLoans.length,
          totalLoanDebt: debt,
          totalContributed: contributed,
          projectedTotalContribution,
          interestEarned: interestShare,
          interestPaid,
          interestPerOption,
          netInterestProfit,
          projectedReturn: currentBalance,
        });

        totalContributed += contributed;
        totalProjectedContribution += projectedTotalContribution;
        totalInterest += interestShare;
        totalInterestPaid += interestPaid;
        totalDebt += debt;
        totalActive += activeLoans.length;
      }

      this.fundSummaries.set(summaries);
      this.totalContributed.set(totalContributed);
      this.totalProjectedContribution.set(totalProjectedContribution);
      this.totalInterest.set(totalInterest);
      this.totalInterestPaid.set(totalInterestPaid);
      this.totalNetProfit.set(totalInterest - totalInterestPaid);
      this.totalProjected.set(totalContributed + totalInterest - totalDebt);
      this.totalDebt.set(totalDebt);
      this.totalActiveLoans.set(totalActive);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
