import { Injectable, signal, OnDestroy } from '@angular/core';
import {
  collection,
  query,
  where,
  onSnapshot,
  Unsubscribe,
  DocumentData,
} from 'firebase/firestore';
import { FirebaseService } from './firebase.service';
import { FundStatus, FundType, LoanStatus, PaymentType, UserRole } from '../../core/enums';
import type { Fund, Loan, LoanInstallment, Participant, Payment } from '../../core/models';

interface UserDoc {
  uid: string;
  displayName: string;
  email: string;
  role: UserRole;
  isPrincipalAdmin: boolean;
  createdAt: Date;
}

/**
 * Servicio de estado centralizado con Firestore en tiempo real.
 * Usa onSnapshot para mantener los datos sincronizados automáticamente.
 * Los componentes leen signals y la UI se actualiza sola.
 */
@Injectable({
  providedIn: 'root',
})
export class StateService implements OnDestroy {
  // ===== Signals públicos =====
  readonly funds = signal<Fund[]>([]);
  readonly users = signal<UserDoc[]>([]);

  // Signals por fondo (se cargan bajo demanda con subscribeTo*)
  readonly participants = signal<Participant[]>([]);
  readonly loans = signal<Loan[]>([]);
  readonly payments = signal<Payment[]>([]);

  // Tracking del fondo activo
  private activeFundId: string | null = null;

  // Suscripciones activas
  private subs: Unsubscribe[] = [];
  private fundSubs: Unsubscribe[] = [];

  constructor(private readonly firebase: FirebaseService) {}

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  // ===== Suscripciones globales =====

  /** Escucha todos los fondos en tiempo real. */
  subscribeToFunds(): void {
    const q = query(collection(this.firebase.db, 'funds'));
    const unsub = onSnapshot(q, (snapshot) => {
      const funds = snapshot.docs
        .map((d) => this.mapToFund({ id: d.id, ...d.data() }))
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      this.funds.set(funds);
    });
    this.subs.push(unsub);
  }

  /** Escucha todos los usuarios en tiempo real. */
  subscribeToUsers(): void {
    const q = query(collection(this.firebase.db, 'users'));
    const unsub = onSnapshot(q, (snapshot) => {
      const users = snapshot.docs.map((d) => {
        const data = d.data();
        return {
          uid: d.id,
          displayName: (data['displayName'] as string) ?? '',
          email: (data['email'] as string) ?? '',
          role: (data['role'] as UserRole) ?? UserRole.PARTICIPANT,
          isPrincipalAdmin: (data['isPrincipalAdmin'] as boolean) ?? false,
          createdAt: data['createdAt']?.toDate?.() ?? new Date(),
        };
      });
      this.users.set(users);
    });
    this.subs.push(unsub);
  }

  // ===== Suscripciones por fondo =====

  /** Escucha participantes, préstamos y pagos de un fondo en tiempo real. */
  subscribeToFundData(fundId: string): void {
    // Evitar re-suscribirse al mismo fondo
    if (this.activeFundId === fundId) return;

    // Limpiar suscripciones del fondo anterior
    this.unsubscribeFundData();
    this.activeFundId = fundId;

    // Participants
    const pQ = query(collection(this.firebase.db, 'participants'), where('fundId', '==', fundId));
    const pUnsub = onSnapshot(pQ, (snapshot) => {
      const participants = snapshot.docs
        .map((d) => this.mapToParticipant({ id: d.id, ...d.data() }))
        .sort((a, b) => a.joinedAt.getTime() - b.joinedAt.getTime());
      this.participants.set(participants);
    });
    this.fundSubs.push(pUnsub);

    // Loans
    const lQ = query(collection(this.firebase.db, 'loans'), where('fundId', '==', fundId));
    const lUnsub = onSnapshot(lQ, (snapshot) => {
      const loans = snapshot.docs
        .map((d) => this.mapToLoan({ id: d.id, ...d.data() }))
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      this.loans.set(loans);
    });
    this.fundSubs.push(lUnsub);

    // Payments
    const payQ = query(collection(this.firebase.db, 'payments'), where('fundId', '==', fundId));
    const payUnsub = onSnapshot(payQ, (snapshot) => {
      const payments = snapshot.docs
        .map((d) => this.mapToPayment({ id: d.id, ...d.data() }))
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      this.payments.set(payments);
    });
    this.fundSubs.push(payUnsub);
  }

  /** Limpia suscripciones de datos de un fondo específico. */
  unsubscribeFundData(): void {
    this.fundSubs.forEach((u) => u());
    this.fundSubs = [];
    this.activeFundId = null;
    this.participants.set([]);
    this.loans.set([]);
    this.payments.set([]);
  }

  /** Limpia TODAS las suscripciones (para logout). */
  unsubscribeAll(): void {
    this.subs.forEach((u) => u());
    this.subs = [];
    this.unsubscribeFundData();
    this.funds.set([]);
    this.users.set([]);
  }

  // ===== Mappers =====

  private mapToFund(data: Record<string, unknown>): Fund {
    return {
      id: data['id'] as string,
      periodId: data['periodId'] as string,
      name: data['name'] as string,
      type: data['type'] as FundType,
      interestRate: data['interestRate'] as number,
      optionValue: data['optionValue'] as number,
      currency: (data['currency'] as string) ?? 'PEN',
      status: data['status'] as FundStatus,
      totalOptions: (data['totalOptions'] as number) ?? 0,
      createdAt: (data['createdAt'] as { toDate?: () => Date })?.toDate?.() ?? new Date(),
    };
  }

  private mapToParticipant(data: Record<string, unknown>): Participant {
    return {
      id: data['id'] as string,
      fundId: data['fundId'] as string,
      userId: data['userId'] as string,
      name: data['name'] as string,
      optionsPerMonth: (data['optionsPerMonth'] as Record<string, number>) ?? {},
      isLateEntry: (data['isLateEntry'] as boolean) ?? false,
      joinedAt: (data['joinedAt'] as { toDate?: () => Date })?.toDate?.() ?? new Date(),
    };
  }

  private mapToLoan(data: Record<string, unknown>): Loan {
    return {
      id: data['id'] as string,
      fundId: data['fundId'] as string,
      participantId: data['participantId'] as string,
      participantName: data['participantName'] as string,
      amount: data['amount'] as number,
      installmentCount: data['installmentCount'] as number,
      monthlyPayment: data['monthlyPayment'] as number,
      totalToPay: data['totalToPay'] as number,
      interestGenerated: data['interestGenerated'] as number,
      startMonth: data['startMonth'] as string,
      endMonth: data['endMonth'] as string,
      status: data['status'] as LoanStatus,
      isLateEntryLoan: (data['isLateEntryLoan'] as boolean) ?? false,
      installments: (data['installments'] as LoanInstallment[]) ?? [],
      createdAt: (data['createdAt'] as { toDate?: () => Date })?.toDate?.() ?? new Date(),
    };
  }

  private mapToPayment(data: Record<string, unknown>): Payment {
    return {
      id: data['id'] as string,
      fundId: data['fundId'] as string,
      participantId: data['participantId'] as string,
      participantName: data['participantName'] as string,
      type: data['type'] as PaymentType,
      loanId: (data['loanId'] as string) ?? null,
      month: data['month'] as string,
      amount: data['amount'] as number,
      method: data['method'] as Payment['method'],
      paid: (data['paid'] as boolean) ?? false,
      paidAt: (data['paidAt'] as { toDate?: () => Date })?.toDate?.() ?? null,
      createdAt: (data['createdAt'] as { toDate?: () => Date })?.toDate?.() ?? new Date(),
    };
  }
}
