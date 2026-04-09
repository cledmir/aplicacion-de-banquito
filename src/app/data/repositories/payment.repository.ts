import { Injectable } from '@angular/core';
import { where } from 'firebase/firestore';
import { FirebaseService } from '../services/firebase.service';
import { PaymentType } from '../../core/enums';
import type { Payment, RegisterPaymentRequest } from '../../core/models';

@Injectable({
  providedIn: 'root',
})
export class PaymentRepository {
  private readonly COLLECTION = 'payments';

  constructor(private readonly firebase: FirebaseService) {}

  async create(request: RegisterPaymentRequest): Promise<string> {
    const data = {
      fundId: request.fundId,
      participantId: request.participantId,
      participantName: request.participantName,
      type: request.type,
      loanId: request.loanId ?? null,
      month: request.month,
      amount: request.amount,
      method: request.method,
      paid: true,
      paidAt: new Date(),
      createdAt: new Date(),
    };

    return this.firebase.addDocument(this.COLLECTION, data);
  }

  async getByFund(fundId: string): Promise<Payment[]> {
    const docs = await this.firebase.getDocuments(
      this.COLLECTION,
      where('fundId', '==', fundId),
    );
    return docs
      .map((d) => this.mapToPayment(d))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getByFundAndMonth(fundId: string, month: string): Promise<Payment[]> {
    const docs = await this.firebase.getDocuments(
      this.COLLECTION,
      where('fundId', '==', fundId),
    );
    return docs
      .map((d) => this.mapToPayment(d))
      .filter((p) => p.month === month);
  }

  async getByParticipant(participantId: string): Promise<Payment[]> {
    const docs = await this.firebase.getDocuments(
      this.COLLECTION,
      where('participantId', '==', participantId),
    );
    return docs
      .map((d) => this.mapToPayment(d))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async delete(id: string): Promise<void> {
    await this.firebase.deleteDocument(this.COLLECTION, id);
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
