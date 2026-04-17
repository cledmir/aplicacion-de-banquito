import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FundRepository, PeriodRepository, ParticipantRepository, LoanRepository, PaymentRepository } from '../../../../data/repositories';
import { StateService } from '../../../../data/services';
import { FundType, LoanStatus, FundStatus } from '../../../../core/enums';
import type { Fund, Period, Participant, Loan } from '../../../../core/models';

interface ParticipantLoanStatus {
  participant: Participant;
  options: number;
  hasActiveLoan: boolean;
  hasHadLoan: boolean;
  activeLoanAmount: number;
}

@Component({
  selector: 'bf-fund-detail',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="page animate-fade-in">
      @if (fund()) {
        <div class="page-header">
          <div>
            <div class="fund-title-row">
              <span class="fund-emoji">{{ fund()!.type === FundType.BANQUITO ? '🏦' : '🧺' }}</span>
              <h1 class="page-header__title">{{ fund()!.name }}</h1>
              <span class="fund-type-badge" [class]="fund()!.type">
                {{ fund()!.type === FundType.BANQUITO ? 'Banquito' : 'Canastita' }}
              </span>
              @if (fund()!.status === FundStatus.CLOSED) {
                <span class="fund-status-badge closed">
                  <mat-icon>lock</mat-icon> Cerrado
                </span>
              }
            </div>
            @if (period()) {
              <p class="page-header__subtitle">
                Período: {{ period()!.name }} · {{ period()!.months.length }} meses
              </p>
            }
          </div>
          <a mat-button routerLink="/admin/funds">
            <mat-icon>arrow_back</mat-icon>
            Volver
          </a>
        </div>

        <!-- Stats Cards -->
        <div class="stats-grid">
          <div class="stat-card">
            <mat-icon class="stat-icon green">attach_money</mat-icon>
            <div class="stat-info">
              <span class="stat-label">Valor Opción</span>
              <span class="stat-value money">S/ {{ fund()!.optionValue.toFixed(2) }}</span>
            </div>
          </div>
          <div class="stat-card">
            <mat-icon class="stat-icon gold">trending_up</mat-icon>
            <div class="stat-info">
              <span class="stat-label">Tasa de Interés</span>
              <span class="stat-value">{{ (fund()!.interestRate * 100).toFixed(0) }}%
                {{ fund()!.type === FundType.BANQUITO ? 'compuesto' : 'simple' }}
              </span>
            </div>
          </div>
          <div class="stat-card">
            <mat-icon class="stat-icon blue">people</mat-icon>
            <div class="stat-info">
              <span class="stat-label">Participantes</span>
              <span class="stat-value">{{ participants().length }}</span>
            </div>
          </div>
          <div class="stat-card">
            <mat-icon class="stat-icon purple">receipt</mat-icon>
            <div class="stat-info">
              <span class="stat-label">Total Opciones</span>
              <span class="stat-value">{{ totalOptions() }}</span>
            </div>
          </div>
          <div class="stat-card">
            <mat-icon class="stat-icon gold">insights</mat-icon>
            <div class="stat-info">
              <span class="stat-label">Int. x Opción</span>
              <span class="stat-value money">S/ {{ interestPerOption().toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-bar">
          <a mat-flat-button color="primary"
             [routerLink]="['/admin/funds', fundId, 'participants']">
            <mat-icon>group</mat-icon>
            Participantes
          </a>
          @if (fund()!.status === FundStatus.ACTIVE) {
            <a mat-stroked-button
               [routerLink]="['/admin/funds', fundId, 'loans', 'create']">
              <mat-icon>account_balance_wallet</mat-icon>
              Nuevo Préstamo
            </a>
          }
          <a mat-stroked-button
             [routerLink]="['/admin/funds', fundId, 'payments']">
            <mat-icon>receipt_long</mat-icon>
            Cobranza
          </a>
          <a mat-stroked-button
             [routerLink]="['/admin/funds', fundId, 'lottery']">
            <mat-icon>casino</mat-icon>
            Sorteo
          </a>
          <a mat-stroked-button class="report-btn"
             [routerLink]="['/admin/funds', fundId, 'report']">
            <mat-icon>assessment</mat-icon>
            Reporte
          </a>
          
          @if (fund()!.status === FundStatus.ACTIVE) {
            <div class="spacer"></div>
            <button mat-stroked-button color="warn" class="close-fund-btn"
                    (click)="confirmCloseFund()">
              <mat-icon>lock</mat-icon>
              Finalizar Fondo
            </button>
          }
          <button mat-stroked-button class="delete-fund-btn"
                  (click)="confirmDeleteFund()">
            <mat-icon>delete_forever</mat-icon>
            Eliminar
          </button>
        </div>

        <!-- Participants with Loan Status -->
        @if (participantStatuses().length > 0) {
          <div class="section-card">
            <div class="section-header">
              <h3>👥 Participantes — Estado de Préstamos</h3>
              <a mat-button [routerLink]="['/admin/funds', fundId, 'participants']">
                Gestionar
                <mat-icon>arrow_forward</mat-icon>
              </a>
            </div>
            <div class="status-table">
              <div class="status-row header">
                <span>Participante</span>
                <span>Opciones</span>
                <span>Préstamo Activo</span>
                <span>Estado</span>
              </div>
              @for (ps of participantStatuses(); track ps.participant.id) {
                <div class="status-row">
                  <span class="participant-name">{{ ps.participant.name }}</span>
                  <span>{{ ps.options }}</span>
                  <span>
                    @if (ps.hasActiveLoan) {
                      <span class="loan-active">S/ {{ ps.activeLoanAmount.toFixed(2) }}</span>
                    } @else {
                      <span class="no-loan">—</span>
                    }
                  </span>
                  <span>
                    @if (ps.hasActiveLoan) {
                      <span class="badge warning">Con préstamo</span>
                    } @else if (ps.hasHadLoan) {
                      <span class="badge success">Pagado</span>
                    } @else {
                      <span class="badge neutral">Sin préstamo</span>
                    }
                  </span>
                </div>
              }
            </div>
          </div>
        } @else {
          <div class="empty-hint">
            <mat-icon>info_outline</mat-icon>
            <span>Aún no hay participantes. Agrégalos desde la sección de participantes.</span>
          </div>
        }

        <!-- Loan History -->
        <div class="section-card">
          <div class="section-header">
            <h3>📋 Historial de Préstamos</h3>
            <a mat-button [routerLink]="['/admin/funds', fundId, 'loans']">
              Ver todos
              <mat-icon>arrow_forward</mat-icon>
            </a>
          </div>

          @if (loans().length > 0) {
            <div class="loan-history-table">
              <div class="loan-history-row header">
                <span>Participante</span>
                <span>Monto</span>
                <span>Cuotas</span>
                <span>Total</span>
                <span>Estado</span>
                <span>Acciones</span>
              </div>
              @for (loan of loans(); track loan.id) {
                <div class="loan-history-row" [class.paid]="loan.status === LoanStatus.PAID">
                  @if (editingLoanId === loan.id) {
                    <!-- Edit Mode -->
                    <span class="participant-name">{{ loan.participantName }}</span>
                    <span>
                      <input type="number" class="inline-edit" [(ngModel)]="editAmount"
                             name="editAmount" min="1" />
                    </span>
                    <span>
                      <input type="number" class="inline-edit small" [(ngModel)]="editInstallments"
                             name="editInstallments" min="1" max="12" />
                    </span>
                    <span>—</span>
                    <span>
                      <span class="badge" [class]="loan.status">
                        {{ loan.status === 'active' ? 'Activo' : 'Pagado' }}
                      </span>
                    </span>
                    <div class="loan-actions">
                      <button mat-icon-button class="save-btn" (click)="saveLoanEdit(loan)">
                        <mat-icon>check</mat-icon>
                      </button>
                      <button mat-icon-button (click)="cancelEdit()">
                        <mat-icon>close</mat-icon>
                      </button>
                    </div>
                  } @else {
                    <!-- View Mode -->
                    <span class="participant-name">{{ loan.participantName }}</span>
                    <span class="money-value">S/ {{ loan.amount.toFixed(2) }}</span>
                    <span>{{ getPaidCount(loan) }}/{{ loan.installmentCount }}</span>
                    <span class="money-value">S/ {{ loan.totalToPay.toFixed(2) }}</span>
                    <span>
                      <span class="badge" [class]="loan.status">
                        {{ loan.status === 'active' ? 'Activo' : 'Pagado' }}
                      </span>
                    </span>
                    <div class="loan-actions">
                      @if (fund()!.status === FundStatus.ACTIVE) {
                        <button mat-icon-button (click)="startEdit(loan)">
                          <mat-icon>edit</mat-icon>
                        </button>
                        <button mat-icon-button class="delete-btn" (click)="confirmDeleteLoan(loan)">
                          <mat-icon>delete_outline</mat-icon>
                        </button>
                      } @else {
                        <span class="locked-icon"><mat-icon>lock</mat-icon></span>
                      }
                    </div>
                  }
                </div>
              }
            </div>
          } @else {
            <div class="empty-mini">
              <span>No hay préstamos registrados aún</span>
            </div>
          }
        </div>

      } @else if (isLoading()) {
        <div class="loading-state">
          <div class="skeleton" style="height: 32px; width: 300px;"></div>
          <div class="skeleton" style="height: 16px; width: 200px; margin-top: 8px;"></div>
          <div class="stats-grid" style="margin-top: 24px;">
            @for (i of [1,2,3,4]; track i) {
              <div class="skeleton" style="height: 80px;"></div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styleUrls: ['./fund-detail.component.scss'],
})
export class FundDetailComponent implements OnInit {
  readonly FundType = FundType;
  readonly LoanStatus = LoanStatus;
  readonly FundStatus = FundStatus;
  fundId = '';
  
  // Real-time state
  fund = computed(() => this.state.funds().find(f => f.id === this.fundId) ?? null);
  participants = this.state.participants;
  loans = this.state.loans;
  
  period = signal<Period | null>(null);
  isLoading = signal(true);

  // Computed derivations
  totalOptions = computed(() => {
    return this.participants().reduce((sum, p) => {
      const options = Object.values(p.optionsPerMonth);
      return sum + (options.length > 0 ? options[options.length - 1] : 0);
    }, 0);
  });

  participantStatuses = computed<ParticipantLoanStatus[]>(() => {
    const ps = this.participants();
    const ls = this.loans();
    return ps.map((p) => {
      const participantLoans = ls.filter((l) => l.participantId === p.id);
      const activeLoan = participantLoans.find((l) => l.status === LoanStatus.ACTIVE);
      const options = Object.values(p.optionsPerMonth);

      return {
        participant: p,
        options: options.length > 0 ? options[options.length - 1] : 0,
        hasActiveLoan: !!activeLoan,
        hasHadLoan: participantLoans.length > 0,
        activeLoanAmount: activeLoan?.amount ?? 0,
      };
    });
  });

  interestPerOption = computed(() => {
    const totalInt = this.loans().reduce((sum, l) => sum + l.interestGenerated, 0);
    const topt = this.totalOptions();
    return topt > 0 ? totalInt / topt : 0;
  });

  // Edit state
  editingLoanId: string | null = null;
  editAmount = 0;
  editInstallments = 0;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fundRepo: FundRepository,
    private readonly periodRepo: PeriodRepository,
    private readonly participantRepo: ParticipantRepository,
    private readonly loanRepo: LoanRepository,
    private readonly paymentRepo: PaymentRepository,
    private readonly state: StateService,
    private readonly snackBar: MatSnackBar,
  ) {}

  async ngOnInit(): Promise<void> {
    this.fundId = this.route.snapshot.paramMap.get('fundId') ?? '';
    
    // Subscribe to State
    this.state.subscribeToFunds();
    this.state.subscribeToFundData(this.fundId);

    await this.loadInitialData();
  }

  async loadInitialData(): Promise<void> {
    this.isLoading.set(true);
    try {
      const fund = await this.fundRepo.getById(this.fundId);
      if (!fund) {
        this.snackBar.open('Fondo no encontrado', 'OK', { duration: 3000 });
        this.router.navigate(['/admin/funds']);
        return;
      }
      
      const period = await this.periodRepo.getById(fund.periodId);
      this.period.set(period);

    } catch (error) {
      console.error('Error loading fund initial data:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  getCurrentOptions(participant: Participant): number {
    const values = Object.values(participant.optionsPerMonth);
    return values.length > 0 ? values[values.length - 1] : 0;
  }

  getPaidCount(loan: Loan): number {
    return loan.installments.filter((i) => i.paid).length;
  }

  // ===== Edit/Delete Loans =====
  startEdit(loan: Loan): void {
    this.editingLoanId = loan.id;
    this.editAmount = loan.amount;
    this.editInstallments = loan.installmentCount;
  }

  cancelEdit(): void {
    this.editingLoanId = null;
  }

  async saveLoanEdit(loan: Loan): Promise<void> {
    try {
      const fund = this.fund()!;
      const period = this.period()!;
      const calc = (await import('../../../../core/utils')).InterestCalculator.calculate(
        fund.type,
        this.editAmount,
        this.editInstallments,
        fund.interestRate,
        loan.startMonth,
        period.months,
      );

      await this.loanRepo.delete(loan.id);
      await this.loanRepo.create(
        {
          fundId: this.fundId,
          participantId: loan.participantId,
          participantName: loan.participantName,
          amount: this.editAmount,
          installmentCount: this.editInstallments,
          startMonth: loan.startMonth,
          isLateEntryLoan: loan.isLateEntryLoan,
        },
        calc,
      );

      this.editingLoanId = null;
      this.snackBar.open('Préstamo actualizado', 'OK', { duration: 2000 });
    } catch (error) {
      console.error('Error updating loan:', error);
      this.snackBar.open('Error al actualizar préstamo', 'OK', { duration: 3000 });
    }
  }

  confirmDeleteLoan(loan: Loan): void {
    const snackRef = this.snackBar.open(
      `¿Eliminar préstamo de ${loan.participantName}?`,
      'Sí, eliminar',
      { duration: 5000 },
    );
    snackRef.onAction().subscribe(() => {
      this.deleteLoan(loan);
    });
  }

  async deleteLoan(loan: Loan): Promise<void> {
    try {
      await this.loanRepo.delete(loan.id);
      this.snackBar.open('Préstamo eliminado', 'OK', { duration: 2000 });
    } catch (error) {
      console.error('Error deleting loan:', error);
      this.snackBar.open('Error al eliminar', 'OK', { duration: 3000 });
    }
  }

  // ===== Fund State =====
  confirmCloseFund(): void {
    const snackRef = this.snackBar.open(
      '¿Finalizar y archivar este fondo? Ya no podrás agregar aportes ni préstamos.',
      'Sí, Cerrar',
      { duration: 8000 }
    );
    snackRef.onAction().subscribe(() => {
      this.closeFund();
    });
  }

  async closeFund(): Promise<void> {
    try {
      await this.fundRepo.closeFund(this.fundId);
      this.snackBar.open('✅ Fondo cerrado exitosamente.', 'OK', { duration: 3000 });
    } catch (error) {
      console.error('Error closing fund:', error);
      this.snackBar.open('Error al cerrar el fondo.', 'OK', { duration: 3000 });
    }
  }

  // ===== Delete Fund =====
  confirmDeleteFund(): void {
    const fund = this.fund();
    if (!fund) return;

    const confirm1 = window.confirm(
      `¿Estás seguro de eliminar el fondo "${fund.name}"?\n\nEsta acción eliminará TODOS los datos asociados de forma permanente.`
    );
    if (!confirm1) return;

    const confirm2 = window.confirm(
      `Última confirmación: Se borrará "${fund.name}" y toda su información. ¿Continuar?`
    );
    if (!confirm2) return;

    this.deleteFund();
  }

  async deleteFund(): Promise<void> {
    try {
      const [participants, loans, payments] = await Promise.all([
        this.participantRepo.getByFund(this.fundId),
        this.loanRepo.getByFund(this.fundId),
        this.paymentRepo.getByFund(this.fundId),
      ]);

      await Promise.all(payments.map(p => this.paymentRepo.delete(p.id)));
      await Promise.all(loans.map(l => this.loanRepo.delete(l.id)));
      await Promise.all(participants.map(p => this.participantRepo.delete(p.id)));
      await this.fundRepo.delete(this.fundId);

      this.snackBar.open('Fondo eliminado correctamente.', 'OK', { duration: 4000 });
      this.router.navigate(['/admin/funds']);
    } catch (error) {
      console.error('Error deleting fund:', error);
      this.snackBar.open('Error al eliminar el fondo.', 'OK', { duration: 4000 });
    }
  }
}
