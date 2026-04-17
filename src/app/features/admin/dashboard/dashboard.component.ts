import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ParticipantRepository, LoanRepository, PaymentRepository } from '../../../data/repositories';
import { AuthService, StateService } from '../../../data/services';
import type { Loan, Payment } from '../../../core/models';

@Component({
  selector: 'bf-dashboard',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule],
  template: `
    <div class="page animate-fade-in">
      <div class="page-header">
        <div>
          <h1 class="page-header__title">¡Hola, {{ userName() }}! 👋</h1>
          <p class="page-header__subtitle">Resumen de tu sistema de ahorro</p>
        </div>
      </div>

      <!-- KPI Cards -->
      <div class="kpi-grid">
        <div class="kpi-card green">
          <div class="kpi-icon"><mat-icon>account_balance</mat-icon></div>
          <div class="kpi-info">
            <span class="kpi-value">{{ activeFunds() }}</span>
            <span class="kpi-label">Fondos Activos</span>
          </div>
        </div>
        <div class="kpi-card blue">
          <div class="kpi-icon"><mat-icon>people</mat-icon></div>
          <div class="kpi-info">
            <span class="kpi-value">{{ totalParticipants() }}</span>
            <span class="kpi-label">Participantes</span>
          </div>
        </div>
        <div class="kpi-card gold">
          <div class="kpi-icon"><mat-icon>trending_up</mat-icon></div>
          <div class="kpi-info">
            <span class="kpi-value">S/ {{ totalInterest().toFixed(2) }}</span>
            <span class="kpi-label">Intereses Generados</span>
          </div>
        </div>
        <div class="kpi-card purple">
          <div class="kpi-icon"><mat-icon>receipt_long</mat-icon></div>
          <div class="kpi-info">
            <span class="kpi-value">{{ activeLoans() }}</span>
            <span class="kpi-label">Préstamos Activos</span>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="section-card">
        <h3 class="section-title">
          <mat-icon>flash_on</mat-icon>
          Acciones Rápidas
        </h3>
        <div class="quick-actions">
          <a mat-flat-button color="primary" routerLink="/admin/funds/create" class="action-btn">
            <mat-icon>add_circle</mat-icon>
            Nuevo Fondo
          </a>
          <a mat-stroked-button routerLink="/admin/users" class="action-btn">
            <mat-icon>person_add</mat-icon>
            Crear Usuario
          </a>
          <a mat-stroked-button routerLink="/admin/funds" class="action-btn">
            <mat-icon>view_list</mat-icon>
            Ver Fondos
          </a>
        </div>
      </div>

      <!-- Recent Activity -->
      @if (recentLoans().length > 0) {
        <div class="section-card">
          <h3 class="section-title">
            <mat-icon>history</mat-icon>
            Préstamos Recientes
          </h3>
          @for (loan of recentLoans(); track loan.id) {
            <div class="activity-row">
              <div class="activity-icon">
                <mat-icon>account_balance_wallet</mat-icon>
              </div>
              <div class="activity-info">
                <span class="activity-name">{{ loan.participantName }}</span>
                <span class="activity-detail">
                  S/ {{ loan.amount.toFixed(2) }} · {{ loan.installmentCount }} cuotas
                </span>
              </div>
              <span class="activity-status" [class]="loan.status">
                {{ loan.status === 'active' ? 'Activo' : 'Pagado' }}
              </span>
            </div>
          }
        </div>
      }

      <!-- Recent Payments -->
      @if (recentPayments().length > 0) {
        <div class="section-card">
          <h3 class="section-title">
            <mat-icon>payments</mat-icon>
            Pagos Recientes
          </h3>
          @for (pay of recentPayments(); track pay.id) {
            <div class="activity-row">
              <div class="activity-icon payment">
                <mat-icon>{{ pay.type === 'contribution' ? 'savings' : 'credit_card' }}</mat-icon>
              </div>
              <div class="activity-info">
                <span class="activity-name">{{ pay.participantName }}</span>
                <span class="activity-detail">
                  {{ pay.type === 'contribution' ? 'Aporte' : 'Cuota' }} · {{ pay.month }}
                </span>
              </div>
              <span class="activity-amount">S/ {{ pay.amount.toFixed(2) }}</span>
            </div>
          }
        </div>
      }
    </div>
  `,
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userName = signal('');
  private readonly state = inject(StateService);

  // Computed desde StateService — se actualiza en tiempo real
  activeFunds = computed(() =>
    this.state.funds().filter((f) => f.status === 'active').length
  );
  totalParticipants = signal(0);
  totalInterest = signal(0);
  activeLoans = signal(0);
  recentLoans = signal<Loan[]>([]);
  recentPayments = signal<Payment[]>([]);

  constructor(
    private readonly auth: AuthService,
    private readonly participantRepo: ParticipantRepository,
    private readonly loanRepo: LoanRepository,
    private readonly paymentRepo: PaymentRepository,
  ) {}

  async ngOnInit(): Promise<void> {
    const user = this.auth.user();
    this.userName.set(user?.displayName ?? 'Admin');
    this.state.subscribeToFunds();
    await this.loadDashboard();
  }

  async loadDashboard(): Promise<void> {
    try {
      const activeFunds = this.state.funds().filter((f) => f.status === 'active');

      let totalParticipants = 0;
      let totalInterest = 0;
      let totalActiveLoans = 0;
      const allLoans: Loan[] = [];
      const allPayments: Payment[] = [];

      await Promise.all(
        activeFunds.map(async (fund) => {
          const [participants, loans, payments] = await Promise.all([
            this.participantRepo.getByFund(fund.id),
            this.loanRepo.getByFund(fund.id),
            this.paymentRepo.getByFund(fund.id),
          ]);

          totalParticipants += participants.length;
          totalInterest += loans.reduce((sum, l) => sum + l.interestGenerated, 0);
          totalActiveLoans += loans.filter((l) => l.status === 'active').length;
          allLoans.push(...loans);
          allPayments.push(...payments);
        }),
      );

      this.totalParticipants.set(totalParticipants);
      this.totalInterest.set(totalInterest);
      this.activeLoans.set(totalActiveLoans);

      allLoans.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      allPayments.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      this.recentLoans.set(allLoans.slice(0, 5));
      this.recentPayments.set(allPayments.slice(0, 5));
    } catch (error) {
      console.error('Error loading dashboard:', error);
    }
  }
}
