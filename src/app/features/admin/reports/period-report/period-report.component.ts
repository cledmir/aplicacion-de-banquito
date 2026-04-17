import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  FundRepository,
  PeriodRepository,
  ParticipantRepository,
  LoanRepository,
  PaymentRepository,
} from '../../../../data/repositories';
import { ExportService } from '../../../../data/services';
import { PaymentType, LoanStatus } from '../../../../core/enums';
import type { Fund, Period, Participant, Loan, Payment } from '../../../../core/models';

interface MonthReport {
  month: string;
  expectedContributions: number;
  collectedContributions: number;
  expectedLoanPayments: number;
  collectedLoanPayments: number;
  totalExpected: number;
  totalCollected: number;
  completionPercent: number;
}

interface ParticipantReport {
  participant: Participant;
  options: number;
  totalContributed: number;
  totalLoanPayments: number;
  activeLoans: number;
  totalDebt: number;
  interestGenerated: number;
  interestPaid: number;
  netInterestProfit: number;
  netPosition: number;
  projectedTotalContribution: number;
  projectedFinalReturn: number;
}

@Component({
  selector: 'bf-period-report',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule],
  template: `
    <div class="page animate-fade-in">
      <div class="page-header">
        <div>
          <h1 class="page-header__title">📊 Reporte del Período</h1>
          @if (fund()) {
            <p class="page-header__subtitle">{{ fund()!.name }} · {{ period()?.name }}</p>
          }
        </div>
        <div class="header-actions">
          <button mat-stroked-button (click)="downloadPdf()" [disabled]="!fund() || participantReports().length === 0">
            <mat-icon>picture_as_pdf</mat-icon>
            PDF
          </button>
          <button mat-stroked-button (click)="downloadExcel()" [disabled]="!fund() || participantReports().length === 0">
            <mat-icon>table_chart</mat-icon>
            Excel
          </button>
          <a mat-button [routerLink]="['/admin/funds', fundId]">
            <mat-icon>arrow_back</mat-icon>
            Volver
          </a>
        </div>
      </div>

      <!-- Global KPIs -->
      <div class="kpi-grid">
        <div class="kpi-card green">
          <mat-icon>savings</mat-icon>
          <div class="kpi-data">
            <span class="kpi-val">S/ {{ totalCollected().toFixed(2) }}</span>
            <span class="kpi-label">Total Cobrado</span>
          </div>
        </div>
        <div class="kpi-card gold">
          <mat-icon>trending_up</mat-icon>
          <div class="kpi-data">
            <span class="kpi-val">S/ {{ totalInterest().toFixed(2) }}</span>
            <span class="kpi-label">Intereses Generados</span>
          </div>
        </div>
        <div class="kpi-card blue">
          <mat-icon>account_balance_wallet</mat-icon>
          <div class="kpi-data">
            <span class="kpi-val">S/ {{ totalLoaned().toFixed(2) }}</span>
            <span class="kpi-label">Prestado</span>
          </div>
        </div>
        <div class="kpi-card purple">
          <mat-icon>pending_actions</mat-icon>
          <div class="kpi-data">
            <span class="kpi-val">S/ {{ totalPending().toFixed(2) }}</span>
            <span class="kpi-label">Pendiente Cobro</span>
          </div>
        </div>
      </div>

      <!-- Monthly Breakdown -->
      <div class="section-card">
        <h3 class="section-title">📅 Cobranza por Mes</h3>
        <div class="month-table">
          <div class="month-row header">
            <span>Mes</span>
            <span>Esperado</span>
            <span>Cobrado</span>
            <span>Pendiente</span>
            <span>Avance</span>
          </div>
          @for (mr of monthReports(); track mr.month) {
            <div class="month-row" [class.complete]="mr.completionPercent >= 100">
              <span class="month-name">{{ mr.month }}</span>
              <span>S/ {{ mr.totalExpected.toFixed(2) }}</span>
              <span class="collected">S/ {{ mr.totalCollected.toFixed(2) }}</span>
              <span class="pending-val">S/ {{ (mr.totalExpected - mr.totalCollected).toFixed(2) }}</span>
              <div class="progress-mini">
                <div class="progress-bar-mini">
                  <div class="bar-fill" [style.width.%]="mr.completionPercent"></div>
                </div>
                <span class="pct">{{ mr.completionPercent.toFixed(0) }}%</span>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Participant Summary -->
      <div class="section-card">
        <h3 class="section-title">👥 Resumen Financiero por Participante</h3>
        <div class="participant-report-table">
          <div class="pr-row header">
            <span>Participante</span>
            <span>Opc.</span>
            <span>Aportado</span>
            <span>Utilidad Neta</span>
            <span>Retorno Final 🏆</span>
          </div>
          @for (pr of participantReports(); track pr.participant.id) {
            <div class="pr-row">
              <span class="pr-name">{{ pr.participant.name }}</span>
              <span>{{ pr.options }}</span>
              <span class="money">S/ {{ pr.totalContributed.toFixed(2) }}</span>
              <span class="accent" [class.warn]="pr.netInterestProfit < 0">S/ {{ pr.netInterestProfit.toFixed(2) }}</span>
              <span class="net positive">S/ {{ pr.projectedFinalReturn.toFixed(2) }}</span>
            </div>
          }
        </div>
      </div>

      <!-- Participant Loans Summary -->
      <div class="section-card">
        <h3 class="section-title">💸 Préstamos y Utilidad por Participante</h3>
        <div class="loan-report-table">
          <div class="lr-row header">
            <span>Participante</span>
            <span>Int. ganado</span>
            <span>Int. pagado</span>
            <span>Utilidad Neta</span>
            <span>Deuda actual</span>
          </div>
          @for (pr of participantReports(); track pr.participant.id) {
            <div class="lr-row">
              <span class="pr-name">{{ pr.participant.name }}</span>
              <span class="accent">S/ {{ pr.interestGenerated.toFixed(2) }}</span>
              <span class="warn">S/ {{ pr.interestPaid.toFixed(2) }}</span>
              <span class="net" [class.positive]="pr.netInterestProfit >= 0" [class.negative]="pr.netInterestProfit < 0">S/ {{ pr.netInterestProfit.toFixed(2) }}</span>
              <span class="warn" [class.no-debt]="pr.totalDebt === 0">S/ {{ pr.totalDebt.toFixed(2) }}</span>
            </div>
          }
        </div>
      </div>

      <!-- Loan Summary -->
      <div class="section-card">
        <h3 class="section-title">💳 Préstamos del Período</h3>
        <div class="loan-summary-grid">
          <div class="ls-item">
            <span class="ls-label">Préstamos activos</span>
            <span class="ls-value">{{ activeLoansCount() }}</span>
          </div>
          <div class="ls-item">
            <span class="ls-label">Préstamos pagados</span>
            <span class="ls-value">{{ paidLoansCount() }}</span>
          </div>
          <div class="ls-item">
            <span class="ls-label">Monto total prestado</span>
            <span class="ls-value money">S/ {{ totalLoaned().toFixed(2) }}</span>
          </div>
          <div class="ls-item">
            <span class="ls-label">Interés total generado</span>
            <span class="ls-value accent">S/ {{ totalInterest().toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./period-report.component.scss'],
})
export class PeriodReportComponent implements OnInit {
  fundId = '';
  fund = signal<Fund | null>(null);
  period = signal<Period | null>(null);
  monthReports = signal<MonthReport[]>([]);
  participantReports = signal<ParticipantReport[]>([]);

  totalCollected = signal(0);
  totalInterest = signal(0);
  totalLoaned = signal(0);
  totalPending = signal(0);
  activeLoansCount = signal(0);
  paidLoansCount = signal(0);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly fundRepo: FundRepository,
    private readonly periodRepo: PeriodRepository,
    private readonly participantRepo: ParticipantRepository,
    private readonly loanRepo: LoanRepository,
    private readonly paymentRepo: PaymentRepository,
    private readonly exportService: ExportService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.fundId = this.route.snapshot.paramMap.get('fundId') ?? '';
    await this.loadReport();
  }

  async loadReport(): Promise<void> {
    try {
      const fund = await this.fundRepo.getById(this.fundId);
      if (!fund) return;
      this.fund.set(fund);

      const [period, participants, loans, payments] = await Promise.all([
        this.periodRepo.getById(fund.periodId),
        this.participantRepo.getByFund(this.fundId),
        this.loanRepo.getByFund(this.fundId),
        this.paymentRepo.getByFund(this.fundId),
      ]);

      this.period.set(period);
      if (!period) return;

      // Monthly reports
      const monthReports: MonthReport[] = period.months.map((month) => {
        const monthPayments = payments.filter((p) => p.month === month);
        const contributions = monthPayments.filter((p) => p.type === PaymentType.CONTRIBUTION);
        const loanPayments = monthPayments.filter((p) => p.type === PaymentType.LOAN_PAYMENT);

        const expectedContributions = participants.reduce((sum, p) => {
          const opts = p.optionsPerMonth[month] ?? Object.values(p.optionsPerMonth).pop() ?? 0;
          return sum + opts * fund.optionValue;
        }, 0);

        const expectedLoanPayments = loans
          .filter((l) => l.status === LoanStatus.ACTIVE && l.installments.some((i) => i.month === month))
          .reduce((sum, l) => sum + l.monthlyPayment, 0);

        const collectedContributions = contributions.reduce((sum, p) => sum + p.amount, 0);
        const collectedLoanPayments = loanPayments.reduce((sum, p) => sum + p.amount, 0);

        const totalExpected = expectedContributions + expectedLoanPayments;
        const totalCollected = collectedContributions + collectedLoanPayments;

        return {
          month,
          expectedContributions,
          collectedContributions,
          expectedLoanPayments,
          collectedLoanPayments,
          totalExpected,
          totalCollected,
          completionPercent: totalExpected > 0 ? (totalCollected / totalExpected) * 100 : 0,
        };
      });
      this.monthReports.set(monthReports);

      // Participant reports
      const totalFundInterest = loans.reduce((sum, l) => sum + l.interestGenerated, 0);
      const totalOptions = participants.reduce((sum, p) => {
        const opts = Object.values(p.optionsPerMonth);
        return sum + (opts.length > 0 ? opts[opts.length - 1] : 0);
      }, 0);

      const partReports: ParticipantReport[] = participants.map((p) => {
        const pPayments = payments.filter((pay) => pay.participantId === p.id);
        const pLoans = loans.filter((l) => l.participantId === p.id);
        const currentOptions = Object.values(p.optionsPerMonth);
        const opts = currentOptions.length > 0 ? currentOptions[currentOptions.length - 1] : 0;
        const interestShare = totalOptions > 0 ? (opts / totalOptions) * totalFundInterest : 0;

        const totalContributed = pPayments
          .filter((pay) => pay.type === PaymentType.CONTRIBUTION)
          .reduce((sum, pay) => sum + pay.amount, 0);
        const totalLoanPayments = pPayments
          .filter((pay) => pay.type === PaymentType.LOAN_PAYMENT)
          .reduce((sum, pay) => sum + pay.amount, 0);

        const activeLoans = pLoans.filter((l) => l.status === LoanStatus.ACTIVE);
        const debt = activeLoans.reduce((sum, l) => {
          return sum + l.installments.filter((i) => !i.paid).length * l.monthlyPayment;
        }, 0);
        const projectedTotalContribution = opts * fund.optionValue * period.months.length;
        
        const interestPaid = pLoans.reduce((sum, l) => sum + l.interestGenerated, 0);
        const netInterestProfit = interestShare - interestPaid;

        return {
          participant: p,
          options: opts,
          totalContributed,
          totalLoanPayments,
          activeLoans: activeLoans.length,
          totalDebt: debt,
          interestGenerated: interestShare,
          interestPaid,
          netInterestProfit,
          netPosition: totalContributed + interestShare - debt,
          projectedTotalContribution,
          projectedFinalReturn: projectedTotalContribution + netInterestProfit,
        };
      });
      this.participantReports.set(partReports);

      // Globals
      this.totalCollected.set(payments.reduce((sum, p) => sum + p.amount, 0));
      this.totalInterest.set(totalFundInterest);
      this.totalLoaned.set(loans.reduce((sum, l) => sum + l.amount, 0));
      this.activeLoansCount.set(loans.filter((l) => l.status === LoanStatus.ACTIVE).length);
      this.paidLoansCount.set(loans.filter((l) => l.status === LoanStatus.PAID).length);

      const totalExpected = monthReports.reduce((sum, m) => sum + m.totalExpected, 0);
      const totalColl = monthReports.reduce((sum, m) => sum + m.totalCollected, 0);
      this.totalPending.set(Math.max(0, totalExpected - totalColl));
    } catch (error) {
      console.error('Error loading report:', error);
    }
  }

  downloadExcel(): void {
    if (!this.fund() || !this.period()) return;

    // Hoja 1: Resumen Global
    const globalData = [
      { Métrica: 'Total Cobrado', Monto: this.totalCollected() },
      { Métrica: 'Intereses Generados', Monto: this.totalInterest() },
      { Métrica: 'Total Prestado', Monto: this.totalLoaned() },
      { Métrica: 'Pendiente de Cobro', Monto: this.totalPending() },
      { Métrica: 'Préstamos Activos', Monto: this.activeLoansCount() },
      { Métrica: 'Préstamos Pagados', Monto: this.paidLoansCount() },
    ];

    // Hoja 2: Cobranza por Mes
    const monthsData = this.monthReports().map((m) => ({
      Mes: m.month,
      Esperado_Aportes: m.expectedContributions,
      Cobrado_Aportes: m.collectedContributions,
      Esperado_Prestamos: m.expectedLoanPayments,
      Cobrado_Prestamos: m.collectedLoanPayments,
      Total_Esperado: m.totalExpected,
      Total_Cobrado: m.totalCollected,
      Avance_Porcentaje: m.completionPercent.toFixed(2) + '%',
    }));

    // Hoja 3: Resumen por Participante
    const participantsData = this.participantReports().map((p) => ({
      Participante: p.participant.name,
      Opciones: p.options,
      Aportado: p.totalContributed,
      Deuda_Total: p.totalDebt,
      Interes_Ganado: p.interestGenerated,
      Interes_Pagado: p.interestPaid,
      Utilidad_Intereses: p.interestGenerated - p.interestPaid,
      Saldo_Actual: p.netPosition,
      Aporte_Total_Proyectado: p.projectedTotalContribution,
      Retorno_Final_Bruto: p.projectedFinalReturn,
    }));

    this.exportService.exportToExcel(
      [
        { sheetName: 'Resumen Global', data: globalData },
        { sheetName: 'Cobranza Mensual', data: monthsData },
        { sheetName: 'Participantes', data: participantsData },
      ],
      `Reporte_${this.fund()!.name.replace(/\\s+/g, '_')}`
    );
  }

  downloadPdf(): void {
    if (!this.fund() || !this.period()) return;

    const title = 'Reporte del Período';
    const subtitle = `Fondo: ${this.fund()!.name} | Período: ${this.period()!.name}`;

    const globalsTable = {
      title: 'Resumen Financiero Global',
      head: [['Métrica', 'Monto']],
      body: [
        ['Total Cobrado', `S/ ${this.totalCollected().toFixed(2)}`],
        ['Intereses Generados', `S/ ${this.totalInterest().toFixed(2)}`],
        ['Total Prestado', `S/ ${this.totalLoaned().toFixed(2)}`],
        ['Pendiente de Cobro', `S/ ${this.totalPending().toFixed(2)}`],
      ],
    };

    const monthsTable = {
      title: 'Cobranza por Mes',
      head: [['Mes', 'Esperado', 'Cobrado', 'Pendiente', 'Avance %']],
      body: this.monthReports().map((m) => [
        m.month,
        `S/ ${m.totalExpected.toFixed(2)}`,
        `S/ ${m.totalCollected.toFixed(2)}`,
        `S/ ${(m.totalExpected - m.totalCollected).toFixed(2)}`,
        `${m.completionPercent.toFixed(0)}%`,
      ]),
    };

    const participantsTable = {
      title: 'Desglose Financiero',
      head: [['Participante', 'Opc.', 'Aportado', 'Utilidad Neta', 'Retorno Final']],
      body: this.participantReports().map((p) => [
        p.participant.name,
        p.options.toString(),
        `S/ ${p.totalContributed.toFixed(2)}`,
        `S/ ${p.netInterestProfit.toFixed(2)}`,
        `S/ ${p.projectedFinalReturn.toFixed(2)}`,
      ]),
    };

    const loansTable = {
      title: 'Préstamos y Utilidad por Participante',
      head: [['Participante', 'Int. Ganado', 'Int. Pagado', 'Utilidad Neta', 'Deuda Actual']],
      body: this.participantReports().map((p) => [
        p.participant.name,
        `S/ ${p.interestGenerated.toFixed(2)}`,
        `S/ ${p.interestPaid.toFixed(2)}`,
        `S/ ${p.netInterestProfit.toFixed(2)}`,
        `S/ ${p.totalDebt.toFixed(2)}`,
      ]),
    };

    this.exportService.exportToPdf(
      title,
      subtitle,
      [globalsTable, monthsTable, participantsTable, loansTable],
      `Reporte_PDF_${this.fund()!.name.replace(/\\s+/g, '_')}`
    );
  }
}
