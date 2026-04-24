import { Component, signal, computed, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../data/services';
import { FundRepository, ParticipantRepository, LoanRepository, PaymentRepository } from '../../../data/repositories';
import { InterestCalculator } from '../../../core/utils';
import { FundType } from '../../../core/enums';
import type { Fund, LoanCalculation } from '../../../core/models';

interface SimulatorFund {
  fund: Fund;
  availableBalance: number;
}

@Component({
  selector: 'bf-loan-simulator',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="page animate-fade-in">
      <div class="page-header">
        <div>
          <h1 class="page-title">
            <mat-icon>calculate</mat-icon>
            Simulador de Préstamos
          </h1>
          <p class="page-subtitle">Calcula cuánto pagarías antes de solicitar un préstamo</p>
        </div>
        <a mat-button [routerLink]="backRoute()">
          <mat-icon>arrow_back</mat-icon> Volver al inicio
        </a>
      </div>

      @if (isLoading()) {
        <div class="loading-state" style="display:flex; flex-direction:column; align-items:center; opacity:0.7; padding:4rem;">
          <mat-spinner diameter="40"></mat-spinner>
          <p style="margin-top:1rem;">Cargando fondos activos...</p>
        </div>
      } @else {
        <div class="simulator-container">
          <!-- Config -->
        <div class="sim-form">
          @if (availableFunds().length > 0) {
            <mat-form-field appearance="outline">
              <mat-label>Fondo</mat-label>
              <mat-select [(ngModel)]="selectedFundIndex" name="fund"
                          (ngModelChange)="onFundChange()">
                @for (sf of availableFunds(); track sf.fund.id; let i = $index) {
                  <mat-option [value]="i">
                    {{ sf.fund.type === 'banquito' ? '🏦' : '🧺' }} {{ sf.fund.name }}
                    ({{ (sf.fund.interestRate * 100).toFixed(0) }}%)
                  </mat-option>
                }
              </mat-select>
            </mat-form-field>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Monto (S/)</mat-label>
                <input matInput type="number" [(ngModel)]="amount"
                       name="amount" min="100" step="50" />
                <span matPrefix>S/&nbsp;</span>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Cuotas (meses)</mat-label>
                <input matInput type="number" [(ngModel)]="installments"
                       name="installments" min="1" max="12" />
              </mat-form-field>
            </div>

            <button mat-flat-button color="primary" class="simulate-btn"
                    (click)="simulate()" [disabled]="amount <= 0 || installments <= 0">
              <mat-icon>play_arrow</mat-icon>
              Simular
            </button>
          } @else {
            <div class="empty-state">
              <span class="empty-icon">📊</span>
              <h3>No estás en ningún fondo</h3>
              <p>Contacta al administrador para que te agregue</p>
            </div>
          }
        </div>

        <!-- Results -->
        @if (result()) {
          <div class="sim-results animate-fade-in">
            <h3 class="results-title">
              <mat-icon>receipt_long</mat-icon>
              Resultado de la Simulación
            </h3>

            <!-- Visual Summary -->
            <div class="summary-visual">
              <div class="amount-pill original">
                <span class="pill-label">Solicitas</span>
                <span class="pill-value">S/ {{ amount.toFixed(2) }}</span>
              </div>
              <mat-icon class="arrow-icon">arrow_forward</mat-icon>
              <div class="amount-pill total">
                <span class="pill-label">Devuelves</span>
                <span class="pill-value">S/ {{ result()!.totalToPay.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Key Numbers -->
            <div class="key-numbers">
              <div class="key-item">
                <span class="key-label">Cuota mensual</span>
                <span class="key-value primary">S/ {{ result()!.monthlyPayment.toFixed(2) }}</span>
              </div>
              <div class="key-item">
                <span class="key-label">Interés total</span>
                <span class="key-value accent">S/ {{ result()!.interestGenerated.toFixed(2) }}</span>
              </div>
              <div class="key-item">
                <span class="key-label">Tasa</span>
                <span class="key-value">{{ currentRate() }}%
                  {{ currentType() === 'banquito' ? 'compuesto' : 'simple' }}
                </span>
              </div>
              <div class="key-item">
                <span class="key-label">Plazo</span>
                <span class="key-value">{{ installments }} meses</span>
              </div>
            </div>

            <!-- Installment Schedule -->
            <div class="schedule-section">
              <h4>📅 Calendario de pagos</h4>
              @for (inst of result()!.installments; track inst.month; let i = $index) {
                <div class="schedule-row">
                  <span class="sch-num">{{ i + 1 }}</span>
                  <span class="sch-month">{{ inst.month }}</span>
                  <span class="sch-amount">S/ {{ inst.amount.toFixed(2) }}</span>
                </div>
              }
            </div>

            <!-- Comparison: different terms -->
            <div class="compare-section">
              <h4>📊 Comparar plazos</h4>
              <div class="compare-grid">
                @for (comp of comparisons(); track comp.months) {
                  <div class="compare-card" [class.selected]="comp.months === installments"
                       (click)="installments = comp.months; simulate()">
                    <span class="comp-months">{{ comp.months }} meses</span>
                    <span class="comp-payment">S/ {{ comp.monthlyPayment.toFixed(2) }}/mes</span>
                    <span class="comp-interest">+S/ {{ comp.interest.toFixed(2) }}</span>
                  </div>
                }
              </div>
            </div>
          </div>
        }
        </div>
      }
    </div>
  `,
  styleUrls: ['./loan-simulator.component.scss'],
})
export class LoanSimulatorComponent implements OnInit {
  isLoading = signal(true);
  availableFunds = signal<SimulatorFund[]>([]);
  result = signal<LoanCalculation | null>(null);
  comparisons = signal<{ months: number; monthlyPayment: number; interest: number }[]>([]);

  backRoute = computed(() =>
    this.auth.isAdmin() ? '/admin/dashboard' : '/participant/dashboard'
  );

  selectedFundIndex = 0;
  amount = 500;
  installments = 3;

  constructor(
    private readonly auth: AuthService,
    private readonly fundRepo: FundRepository,
    private readonly participantRepo: ParticipantRepository,
    private readonly paymentRepo: PaymentRepository,
    private readonly loanRepo: LoanRepository,
  ) {}

  currentRate(): string {
    const sf = this.availableFunds()[this.selectedFundIndex];
    return sf ? (sf.fund.interestRate * 100).toFixed(0) : '0';
  }

  currentType(): string {
    const sf = this.availableFunds()[this.selectedFundIndex];
    return sf ? sf.fund.type : '';
  }

  async ngOnInit(): Promise<void> {
    await this.loadFunds();
  }

  async loadFunds(): Promise<void> {
    this.isLoading.set(true);
    try {
      const user = this.auth.user();
      if (!user) return;

      const funds = await this.fundRepo.getAll();
      const simFunds: SimulatorFund[] = [];
      const isAdmin = this.auth.isAdmin();

      for (const fund of funds) {
        if (!isAdmin) {
          // Participante: solo fondos donde participa
          const participants = await this.participantRepo.getByFund(fund.id);
          const me = participants.find((p) => p.userId === user.uid);
          if (!me) continue;
        }

        const [payments, fundLoans] = await Promise.all([
          this.paymentRepo.getByFund(fund.id),
          this.loanRepo.getByFund(fund.id)
        ]);

        const totalCollected = payments.reduce((sum, p) => sum + p.amount, 0);
        const totalLoaned = fundLoans
          .filter((l) => l.status === 'active')
          .reduce((sum, l) => sum + l.amount, 0);
        const balance = Math.max(0, totalCollected - totalLoaned);

        simFunds.push({ fund, availableBalance: balance });
      }

      this.availableFunds.set(simFunds);

      if (simFunds.length > 0) {
        this.onFundChange();
      }
    } catch (error) {
      console.error('Error loading funds:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  onFundChange(): void {
    const sf = this.availableFunds()[this.selectedFundIndex];
    if (!sf) return;

    this.amount = sf.availableBalance;
    this.result.set(null);
    this.comparisons.set([]);
  }

  simulate(): void {
    const sf = this.availableFunds()[this.selectedFundIndex];
    if (!sf || this.amount <= 0 || this.installments <= 0) {
      this.result.set(null);
      return;
    }

    try {
      const calc = InterestCalculator.calculate(
        sf.fund.type as FundType,
        this.amount,
        this.installments,
        sf.fund.interestRate,
      );
      this.result.set(calc);

      // Generate comparisons
      const terms = [1, 2, 3, 4, 6, 8, 10, 12];
      const comps = terms.map((months) => {
        const c = InterestCalculator.calculate(
          sf.fund.type as FundType,
          this.amount,
          months,
          sf.fund.interestRate,
        );
        return {
          months,
          monthlyPayment: c.monthlyPayment,
          interest: c.interestGenerated,
        };
      });
      this.comparisons.set(comps);
    } catch {
      this.result.set(null);
      this.comparisons.set([]);
    }
  }
}
