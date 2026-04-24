import { Component, signal, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ParticipantRepository, FundRepository } from '../../../data/repositories';
import { FundStatus } from '../../../core/enums';
import type { Participant, Fund } from '../../../core/models';

interface WheelSegment {
  participant: Participant;
  color: string;
  startAngle: number;
  endAngle: number;
}

@Component({
  selector: 'bf-lottery',
  standalone: true,
  imports: [RouterLink, FormsModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatProgressSpinnerModule],
  template: `
    <div class="page animate-fade-in">
      <div class="page-header">
        <div>
          <h1 class="page-header__title">🎰 Sorteo</h1>
          @if (fund()) {
            <p class="page-header__subtitle">{{ fund()!.name }}</p>
          }
        </div>
        <a mat-button [routerLink]="['/admin/funds', fundId]">
          <mat-icon>arrow_back</mat-icon>
          Volver
        </a>
      </div>

      @if (isLoading()) {
        <div class="loading-state" style="display:flex; flex-direction:column; align-items:center; opacity:0.7; padding:4rem;">
          <mat-spinner diameter="40"></mat-spinner>
          <p style="margin-top:1rem;">Cargando datos del sorteo...</p>
        </div>
      } @else if (eligibleParticipants().length >= 2) {
        <div class="lottery-container">
          <!-- Wheel -->
          <div class="wheel-wrapper">
            <div class="wheel-pointer">▼</div>
            <canvas #wheelCanvas
                    width="420" height="420"
                    class="wheel-canvas">
            </canvas>
          </div>

          <!-- Controls -->
          <div class="lottery-controls">
            <!-- Winner Count Selector -->
            <div class="winner-count-section">
              <mat-form-field appearance="outline" class="winner-count-field">
                <mat-label>Cantidad de ganadores</mat-label>
                <input matInput type="number" [(ngModel)]="winnerCount"
                       name="winnerCount" min="1" [max]="maxWinners()" [disabled]="fund()?.status === FundStatus.CLOSED" />
              </mat-form-field>
              <span class="max-hint">Máx: {{ maxWinners() }}</span>
            </div>

            @if (winners().length === 0) {
              @if (fund()?.status === FundStatus.CLOSED) {
                 <div class="empty-mini">Fondo cerrado. Sorteo deshabilitado.</div>
              } @else {
                <button mat-flat-button color="primary" class="spin-btn"
                        (click)="spin()" [disabled]="isSpinning()">
                  @if (isSpinning()) {
                    <span class="spin-text">Girando...</span>
                  } @else {
                    <mat-icon>casino</mat-icon>
                    <span>¡Girar la Ruleta!</span>
                  }
                </button>
              }
            }

            <!-- Winners List -->
            @if (winners().length > 0) {
              <div class="winners-card animate-fade-in">
                <div class="confetti">🎉</div>
                <h2 class="winner-title">
                  {{ winners().length === 1 ? '¡Ganador!' : '¡Ganadores!' }}
                </h2>
                @for (w of winners(); track w.id; let i = $index) {
                  <div class="winner-row">
                    <span class="winner-num">{{ i + 1 }}</span>
                    <span class="winner-name-text">{{ w.name }}</span>
                  </div>
                }
                <button mat-stroked-button (click)="reset()" class="reset-btn">
                  <mat-icon>refresh</mat-icon>
                  Sortear de nuevo
                </button>
              </div>
            }

            <!-- Spinning Progress -->
            @if (isSpinning() && currentWinnerIndex() > 0) {
              <div class="progress-info">
                Seleccionando ganador {{ currentWinnerIndex() }} de {{ winnerCount }}...
              </div>
            }

            <!-- Participants Legend -->
            <div class="participants-legend">
              <h4>Participantes ({{ eligibleParticipants().length }})</h4>
              @for (seg of segments(); track seg.participant.id) {
                <div class="legend-item"
                     [class.is-winner]="isWinner(seg.participant.id)"
                     [class.eliminated]="isEliminated(seg.participant.id)">
                  <span class="legend-color" [style.background]="seg.color"></span>
                  <span class="legend-name">{{ seg.participant.name }}</span>
                  @if (isWinner(seg.participant.id)) {
                    <span class="winner-badge">🏆</span>
                  }
                </div>
              }
            </div>
          </div>
        </div>
      } @else {
        <div class="empty-state">
          <span class="empty-state__icon">🎰</span>
          <h3>Se necesitan al menos 2 participantes</h3>
          <p>Agrega más participantes al fondo para poder realizar el sorteo</p>
          <a mat-flat-button color="primary"
             [routerLink]="['/admin/funds', fundId, 'participants']">
            <mat-icon>person_add</mat-icon>
            Gestionar Participantes
          </a>
        </div>
      }
    </div>
  `,
  styleUrls: ['./lottery.component.scss'],
})
export class LotteryComponent implements OnInit {
  readonly FundStatus = FundStatus;
  @ViewChild('wheelCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  fundId = '';
  fund = signal<Fund | null>(null);
  eligibleParticipants = signal<Participant[]>([]);
  segments = signal<WheelSegment[]>([]);
  winners = signal<Participant[]>([]);
  isSpinning = signal(false);
  currentWinnerIndex = signal(0);
  maxWinners = signal(1);
  isLoading = signal(true);

  winnerCount = 1;
  private currentAngle = 0;
  private readonly COLORS = [
    '#22c55e', '#eab308', '#3b82f6', '#ef4444', '#a855f7',
    '#14b8a6', '#f97316', '#ec4899', '#06b6d4', '#84cc16',
    '#6366f1', '#f43f5e', '#10b981', '#fbbf24', '#8b5cf6',
  ];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly fundRepo: FundRepository,
    private readonly participantRepo: ParticipantRepository,
    private readonly snackBar: MatSnackBar,
  ) {}

  async ngOnInit(): Promise<void> {
    this.fundId = this.route.snapshot.paramMap.get('fundId') ?? '';
    await this.loadData();
  }

  async loadData(): Promise<void> {
    this.isLoading.set(true);
    try {
      const [fund, participants] = await Promise.all([
        this.fundRepo.getById(this.fundId),
        this.participantRepo.getByFund(this.fundId),
      ]);
      this.fund.set(fund);
      this.eligibleParticipants.set(participants);
      this.maxWinners.set(Math.max(1, participants.length - 1));
      this.buildSegments(participants);
      setTimeout(() => this.drawWheel(), 100);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  buildSegments(participants: Participant[]): void {
    const count = participants.length;
    if (count === 0) return;
    const anglePerSegment = (2 * Math.PI) / count;
    const segs: WheelSegment[] = participants.map((p, i) => ({
      participant: p,
      color: this.COLORS[i % this.COLORS.length],
      startAngle: i * anglePerSegment,
      endAngle: (i + 1) * anglePerSegment,
    }));
    this.segments.set(segs);
  }

  drawWheel(rotationAngle = 0): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    const segs = this.segments();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotationAngle);

    segs.forEach((seg) => {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, seg.startAngle, seg.endAngle);
      ctx.closePath();
      ctx.fillStyle = seg.color;
      ctx.fill();
      ctx.strokeStyle = '#0d1117';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      const midAngle = (seg.startAngle + seg.endAngle) / 2;
      ctx.rotate(midAngle);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 13px Inter, sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 3;
      ctx.fillText(seg.participant.name, radius - 20, 5);
      ctx.restore();
    });

    ctx.beginPath();
    ctx.arc(0, 0, 25, 0, 2 * Math.PI);
    ctx.fillStyle = '#0d1117';
    ctx.fill();
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();
  }

  async spin(): Promise<void> {
    if (this.isSpinning() || this.eligibleParticipants().length < 2) return;

    const count = Math.min(this.winnerCount, this.maxWinners());
    this.isSpinning.set(true);
    this.winners.set([]);

    const remaining = [...this.eligibleParticipants()];
    const selectedWinners: Participant[] = [];

    for (let i = 0; i < count; i++) {
      this.currentWinnerIndex.set(i + 1);
      const winner = await this.spinOnce(remaining);
      selectedWinners.push(winner);
      remaining.splice(remaining.indexOf(winner), 1);
    }

    this.winners.set(selectedWinners);
    this.isSpinning.set(false);
    this.currentWinnerIndex.set(0);

    const names = selectedWinners.map((w) => w.name).join(', ');
    this.snackBar.open(`🎉 Ganador(es): ${names}`, 'OK', { duration: 8000 });
  }

  private spinOnce(pool: Participant[]): Promise<Participant> {
    return new Promise((resolve) => {
      const segs = this.segments();
      const winnerIndex = Math.floor(Math.random() * pool.length);
      const winner = pool[winnerIndex];

      // Find the segment index in the full segments array
      const segIndex = segs.findIndex((s) => s.participant.id === winner.id);
      const segAngle = (2 * Math.PI) / segs.length;
      const targetMidAngle = segIndex * segAngle + segAngle / 2;
      const pointerAngle = (3 * Math.PI) / 2;
      const targetRotation = pointerAngle - targetMidAngle;
      const fullSpins = 4 + Math.floor(Math.random() * 3);
      const totalRotation = fullSpins * 2 * Math.PI + targetRotation;

      const startTime = performance.now();
      const duration = 3000 + Math.random() * 1000;
      const startAngle = this.currentAngle;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const angle = startAngle + totalRotation * eased;
        this.drawWheel(angle);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          this.currentAngle = angle;
          resolve(winner);
        }
      };

      requestAnimationFrame(animate);
    });
  }

  isWinner(participantId: string): boolean {
    return this.winners().some((w) => w.id === participantId);
  }

  isEliminated(participantId: string): boolean {
    return false; // Could be used for future elimination rounds
  }

  reset(): void {
    this.winners.set([]);
    this.currentWinnerIndex.set(0);
  }
}
