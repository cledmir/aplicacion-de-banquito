import { Component, signal, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FundRepository, PeriodRepository } from '../../../../data/repositories';
import { AuthService } from '../../../../data/services';
import { FundType } from '../../../../core/enums';
import type { Period } from '../../../../core/models';

@Component({
  selector: 'bf-fund-create',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="page animate-fade-in">
      <div class="page-header">
        <div>
          <h1 class="page-header__title">Crear Fondo</h1>
          <p class="page-header__subtitle">Configura un nuevo Banquito o Canastita</p>
        </div>
        <a mat-button routerLink="/admin/funds">
          <mat-icon>arrow_back</mat-icon>
          Volver
        </a>
      </div>

      <div class="form-container">
        <form class="create-form" (ngSubmit)="onSubmit()">
          <!-- Período -->
          <div class="form-section">
            <h3 class="form-section__title">
              <mat-icon>date_range</mat-icon>
              Período
            </h3>

            @if (periods().length > 0) {
              <mat-form-field appearance="outline">
                <mat-label>Seleccionar período existente</mat-label>
                <mat-select [(ngModel)]="selectedPeriodId" name="period">
                  @for (period of periods(); track period.id) {
                    <mat-option [value]="period.id">
                      {{ period.name }} ({{ period.months.length }} meses)
                    </mat-option>
                  }
                  <mat-option value="new">+ Crear nuevo período</mat-option>
                </mat-select>
              </mat-form-field>
            }

            @if (periods().length === 0 || selectedPeriodId === 'new') {
              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>Nombre del período</mat-label>
                  <input matInput [(ngModel)]="periodName" name="periodName"
                         placeholder="ej: 2025" required />
                </mat-form-field>
              </div>
              <div class="form-row two-cols">
                <mat-form-field appearance="outline">
                  <mat-label>Fecha inicio</mat-label>
                  <input matInput [matDatepicker]="startPicker"
                         [(ngModel)]="periodStart" name="periodStart" required />
                  <mat-datepicker-toggle matSuffix [for]="startPicker" />
                  <mat-datepicker #startPicker />
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Fecha fin</mat-label>
                  <input matInput [matDatepicker]="endPicker"
                         [(ngModel)]="periodEnd" name="periodEnd" required />
                  <mat-datepicker-toggle matSuffix [for]="endPicker" />
                  <mat-datepicker #endPicker />
                </mat-form-field>
              </div>
            }
          </div>

          <!-- Tipo de Fondo -->
          <div class="form-section">
            <h3 class="form-section__title">
              <mat-icon>account_balance</mat-icon>
              Tipo de Fondo
            </h3>

            <div class="type-selector">
              <div class="type-card" [class.selected]="fundType === FundType.BANQUITO"
                   (click)="selectType(FundType.BANQUITO)">
                <span class="type-card__emoji">🏦</span>
                <span class="type-card__name">Banquito</span>
                <span class="type-card__desc">Interés compuesto</span>
              </div>
              <div class="type-card" [class.selected]="fundType === FundType.CANASTITA"
                   (click)="selectType(FundType.CANASTITA)">
                <span class="type-card__emoji">🧺</span>
                <span class="type-card__name">Canastita</span>
                <span class="type-card__desc">Interés simple</span>
              </div>
            </div>
          </div>

          <!-- Configuración -->
          <div class="form-section">
            <h3 class="form-section__title">
              <mat-icon>settings</mat-icon>
              Configuración
            </h3>

            <mat-form-field appearance="outline">
              <mat-label>Nombre del fondo</mat-label>
              <input matInput [(ngModel)]="fundName" name="fundName"
                     placeholder="ej: Banquito Principal 2025" required />
            </mat-form-field>

            <div class="form-row two-cols">
              <mat-form-field appearance="outline">
                <mat-label>Valor por opción (S/)</mat-label>
                <input matInput type="number" [(ngModel)]="optionValue"
                       name="optionValue" min="1" required />
                <span matPrefix>S/&nbsp;</span>
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Tasa de interés (%)</mat-label>
                <input matInput type="number" [(ngModel)]="interestRate"
                       name="interestRate" min="0" max="100" step="0.5" required />
                <span matSuffix>&nbsp;%</span>
              </mat-form-field>
            </div>
          </div>

          <!-- Preview -->
          @if (fundName && optionValue > 0) {
            <div class="preview-card">
              <h4>Vista previa</h4>
              <div class="preview-details">
                <span>{{ fundType === FundType.BANQUITO ? '🏦' : '🧺' }} {{ fundName }}</span>
                <span>Opción: <strong class="money">S/ {{ optionValue.toFixed(2) }}</strong></span>
                <span>Interés: <strong>{{ interestRate }}% {{ fundType === FundType.BANQUITO ? 'compuesto' : 'simple' }}</strong></span>
              </div>
            </div>
          }

          @if (errorMessage()) {
            <div class="form-error">
              <mat-icon>error_outline</mat-icon>
              {{ errorMessage() }}
            </div>
          }

          <div class="form-actions">
            <a mat-button routerLink="/admin/funds">Cancelar</a>
            <button mat-flat-button color="primary" type="submit"
                    [disabled]="isSaving()" id="save-fund-btn">
              @if (isSaving()) {
                <mat-spinner diameter="20" />
              } @else {
                <ng-container>Crear Fondo</ng-container>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./fund-create.component.scss'],
})
export class FundCreateComponent implements OnInit {
  // Period
  periods = signal<Period[]>([]);
  selectedPeriodId = '';
  periodName = '';
  periodStart: Date | null = null;
  periodEnd: Date | null = null;

  // Fund
  readonly FundType = FundType;
  fundType: FundType = FundType.BANQUITO;
  fundName = '';
  optionValue = 100;
  interestRate = 5;

  // UI
  isSaving = signal(false);
  errorMessage = signal('');

  constructor(
    private readonly fundRepo: FundRepository,
    private readonly periodRepo: PeriodRepository,
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
  ) {}

  async ngOnInit(): Promise<void> {
    const periods = await this.periodRepo.getActive();
    this.periods.set(periods);
    if (periods.length > 0) {
      this.selectedPeriodId = periods[0].id;
    }
  }

  selectType(type: FundType): void {
    this.fundType = type;
  }

  async onSubmit(): Promise<void> {
    this.errorMessage.set('');

    if (!this.fundName.trim()) {
      this.errorMessage.set('Ingresa un nombre para el fondo.');
      return;
    }

    if (this.optionValue <= 0) {
      this.errorMessage.set('El valor de la opción debe ser mayor a 0.');
      return;
    }

    this.isSaving.set(true);

    try {
      let periodId = this.selectedPeriodId;

      // Create new period if needed
      if (!periodId || periodId === 'new') {
        if (!this.periodName || !this.periodStart || !this.periodEnd) {
          this.errorMessage.set('Completa los datos del período.');
          this.isSaving.set(false);
          return;
        }

        periodId = await this.periodRepo.create(
          {
            name: this.periodName,
            startDate: this.periodStart,
            endDate: this.periodEnd,
          },
          this.auth.user()!.uid,
        );
      }

      await this.fundRepo.create(
        {
          periodId,
          name: this.fundName,
          type: this.fundType,
          interestRate: this.interestRate / 100,
          optionValue: this.optionValue,
        },
        this.auth.user()!.uid,
      );

      this.snackBar.open('¡Fondo creado exitosamente!', 'OK', { duration: 3000 });
      this.router.navigate(['/admin/funds']);
    } catch (error) {
      console.error('Error creating fund:', error);
      this.errorMessage.set('Error al crear el fondo. Intenta de nuevo.');
    } finally {
      this.isSaving.set(false);
    }
  }
}
