import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ParticipantRepository, FundRepository, PeriodRepository } from '../../../../data/repositories';
import { FirebaseService } from '../../../../data/services';
import type { Participant, Fund, Period } from '../../../../core/models';

interface UserOption {
  uid: string;
  displayName: string;
  email: string;
}

@Component({
  selector: 'bf-participant-list',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="page animate-fade-in">
      <div class="page-header">
        <div>
          <h1 class="page-header__title">Participantes</h1>
          @if (fund()) {
            <p class="page-header__subtitle">{{ fund()!.name }}</p>
          }
        </div>
        <a mat-button [routerLink]="['/admin/funds', fundId]">
          <mat-icon>arrow_back</mat-icon>
          Volver al fondo
        </a>
      </div>

      @if (isLoading()) {
        <div class="loading-state" style="display:flex; flex-direction:column; align-items:center; opacity:0.7; padding:4rem;">
          <mat-spinner diameter="40"></mat-spinner>
          <p style="margin-top:1rem;">Cargando participantes...</p>
        </div>
      } @else {

      <!-- Add Participant Form -->
      <div class="add-form-card">
        <h3 class="section-title">
          <mat-icon>person_add</mat-icon>
          Agregar Participante
        </h3>

        <div class="add-form">
          <mat-form-field appearance="outline" class="user-select">
            <mat-label>Seleccionar usuario</mat-label>
            <mat-select [(ngModel)]="selectedUserId" name="userId">
              @for (user of availableUsers(); track user.uid) {
                <mat-option [value]="user.uid">
                  {{ user.displayName }} ({{ user.email }})
                </mat-option>
              }
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="options-field">
            <mat-label>Opciones</mat-label>
            <input matInput type="number" [(ngModel)]="initialOptions"
                   name="options" min="1" max="10" />
          </mat-form-field>

          <button mat-flat-button color="primary" (click)="addParticipant()"
                  [disabled]="isAdding()">
            @if (isAdding()) {
              <mat-spinner diameter="20" />
            } @else {
              <ng-container>Agregar</ng-container>
            }
          </button>
        </div>
      </div>

      <!-- Participant List -->
      @if (participants().length > 0) {
        <div class="participants-card">
          <div class="participant-grid header">
            <span>#</span>
            <span>Nombre</span>
            <span>Opciones</span>
            <span>Aporte Mensual</span>
            <span>Estado</span>
            <span>Acciones</span>
          </div>
          @for (p of participants(); track p.id; let i = $index) {
            <div class="participant-grid row">
              <span class="row-num">{{ i + 1 }}</span>
              <span class="participant-name">
                {{ p.name }}
                @if (p.isLateEntry) {
                  <span class="late-tag">Tardío</span>
                }
              </span>
              <span class="options-count">{{ getCurrentOptions(p) }}</span>
              <span class="money-value">
                S/ {{ (getCurrentOptions(p) * fund()!.optionValue).toFixed(2) }}
              </span>
              <span class="status-active">Activo</span>
              <div class="row-actions">
                <button mat-icon-button class="delete-btn"
                        (click)="confirmRemove(p)">
                  <mat-icon>delete_outline</mat-icon>
                </button>
              </div>
            </div>
          }

          <div class="totals-row">
            <span></span>
            <span class="total-label">Total</span>
            <span class="total-value">{{ totalOptions() }} opc.</span>
            <span class="total-value money">
              S/ {{ (totalOptions() * fund()!.optionValue).toFixed(2) }}
            </span>
            <span></span>
            <span></span>
          </div>
        </div>
      } @else {
        <div class="empty-state">
          <span class="empty-state__icon">👥</span>
          <h3>Sin participantes</h3>
          <p>Agrega participantes usando el formulario de arriba</p>
        </div>
      }
      }
    </div>
  `,
  styleUrls: ['./participant-list.component.scss'],
})
export class ParticipantListComponent implements OnInit {
  fundId = '';
  fund = signal<Fund | null>(null);
  period = signal<Period | null>(null);
  participants = signal<Participant[]>([]);
  availableUsers = signal<UserOption[]>([]);
  totalOptions = signal(0);

  selectedUserId = '';
  initialOptions = 1;
  isAdding = signal(false);
  isLoading = signal(true);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly participantRepo: ParticipantRepository,
    private readonly fundRepo: FundRepository,
    private readonly periodRepo: PeriodRepository,
    private readonly firebase: FirebaseService,
    private readonly snackBar: MatSnackBar,
  ) {}

  async ngOnInit(): Promise<void> {
    this.fundId = this.route.snapshot.paramMap.get('fundId') ?? '';
    await this.loadData();
  }

  async loadData(): Promise<void> {
    this.isLoading.set(true);
    try {
      const fund = await this.fundRepo.getById(this.fundId);
      this.fund.set(fund);

      if (fund) {
        const [period, participants] = await Promise.all([
          this.periodRepo.getById(fund.periodId),
          this.participantRepo.getByFund(this.fundId),
        ]);
        this.period.set(period);
        this.participants.set(participants);
        this.calculateTotals(participants);

        // Load available users (not yet participating)
        await this.loadAvailableUsers(participants);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async loadAvailableUsers(currentParticipants: Participant[]): Promise<void> {
    try {
      const allUsers = await this.firebase.getDocuments('users');
      const participantUserIds = new Set(currentParticipants.map((p) => p.userId));

      const available = allUsers
        .filter((u) => !participantUserIds.has(u['id'] as string))
        .map((u) => ({
          uid: u['id'] as string,
          displayName: (u['displayName'] as string) ?? '',
          email: (u['email'] as string) ?? '',
        }));

      this.availableUsers.set(available);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }

  async addParticipant(): Promise<void> {
    if (!this.selectedUserId) {
      this.snackBar.open('Selecciona un usuario', 'OK', { duration: 2000 });
      return;
    }

    this.isAdding.set(true);
    try {
      const user = this.availableUsers().find((u) => u.uid === this.selectedUserId);
      if (!user) return;

      const period = this.period();
      const startMonth = period?.months[0] ?? '';

      await this.participantRepo.create({
        fundId: this.fundId,
        userId: user.uid,
        name: user.displayName,
        initialOptions: this.initialOptions,
        startMonth,
      });

      this.snackBar.open(`${user.displayName} agregado al fondo`, 'OK', { duration: 2000 });
      this.selectedUserId = '';
      this.initialOptions = 1;
      await this.loadData();
    } catch (error) {
      console.error('Error adding participant:', error);
      this.snackBar.open('Error al agregar participante', 'OK', { duration: 3000 });
    } finally {
      this.isAdding.set(false);
    }
  }

  confirmRemove(participant: Participant): void {
    const name = participant.name;
    const snackRef = this.snackBar.open(
      `¿Eliminar a ${name} del fondo?`,
      'Sí, eliminar',
      { duration: 5000 },
    );
    snackRef.onAction().subscribe(() => {
      this.removeParticipant(participant);
    });
  }

  async removeParticipant(participant: Participant): Promise<void> {
    try {
      await this.participantRepo.delete(participant.id);
      this.snackBar.open(`${participant.name} eliminado`, 'OK', { duration: 2000 });
      await this.loadData();
    } catch (error) {
      console.error('Error removing participant:', error);
      this.snackBar.open('Error al eliminar participante', 'OK', { duration: 3000 });
    }
  }

  getCurrentOptions(p: Participant): number {
    const values = Object.values(p.optionsPerMonth);
    return values.length > 0 ? values[values.length - 1] : 0;
  }

  private calculateTotals(participants: Participant[]): void {
    const total = participants.reduce((sum, p) => sum + this.getCurrentOptions(p), 0);
    this.totalOptions.set(total);
  }
}
