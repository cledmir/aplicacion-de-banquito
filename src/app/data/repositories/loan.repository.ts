import { Injectable } from '@angular/core';
import { where } from 'firebase/firestore';
import { FirebaseService } from '../services/firebase.service';
import { LoanStatus } from '../../core/enums';
import type { Loan, CreateLoanRequest, LoanInstallment } from '../../core/models';

@Injectable({
  providedIn: 'root',
})
export class LoanRepository {
  private readonly COLLECTION = 'loans';

  constructor(private readonly firebase: FirebaseService) {}

  async create(request: CreateLoanRequest, calculation: {
    monthlyPayment: number;
    totalToPay: number;
    interestGenerated: number;
    installments: LoanInstallment[];
  }): Promise<string> {
    const data = {
      fundId: request.fundId,
      participantId: request.participantId,
      participantName: request.participantName,
      amount: request.amount,
      installmentCount: request.installmentCount,
      monthlyPayment: calculation.monthlyPayment,
      totalToPay: calculation.totalToPay,
      interestGenerated: calculation.interestGenerated,
      startMonth: request.startMonth,
      endMonth: calculation.installments[calculation.installments.length - 1]?.month ?? '',
      status: LoanStatus.ACTIVE,
      isLateEntryLoan: request.isLateEntryLoan,
      installments: calculation.installments,
      createdAt: new Date(),
    };

    return this.firebase.addDocument(this.COLLECTION, data);
  }

  async getById(id: string): Promise<Loan | null> {
    const data = await this.firebase.getDocument(this.COLLECTION, id);
    return data ? this.mapToLoan(data) : null;
  }

  async getByFund(fundId: string): Promise<Loan[]> {
    const docs = await this.firebase.getDocuments(
      this.COLLECTION,
      where('fundId', '==', fundId),
    );
    return docs
      .map((d) => this.mapToLoan(d))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getActiveByFund(fundId: string): Promise<Loan[]> {
    const docs = await this.firebase.getDocuments(
      this.COLLECTION,
      where('fundId', '==', fundId),
    );
    return docs
      .map((d) => this.mapToLoan(d))
      .filter((l) => l.status === LoanStatus.ACTIVE);
  }

  async getByParticipant(participantId: string): Promise<Loan[]> {
    const docs = await this.firebase.getDocuments(
      this.COLLECTION,
      where('participantId', '==', participantId),
    );
    return docs
      .map((d) => this.mapToLoan(d))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async payInstallment(loanId: string, month: string): Promise<void> {
    const loan = await this.getById(loanId);
    if (!loan) throw new Error('Préstamo no encontrado');

    const updatedInstallments = loan.installments.map((inst) => {
      if (inst.month === month && !inst.paid) {
        return { ...inst, paid: true, paidAt: new Date() };
      }
      return inst;
    });

    const allPaid = updatedInstallments.every((inst) => inst.paid);
    const newStatus = allPaid ? LoanStatus.PAID : LoanStatus.ACTIVE;

    await this.firebase.updateDocument(this.COLLECTION, loanId, {
      installments: updatedInstallments,
      status: newStatus,
    });
  }

  async delete(id: string): Promise<void> {
    await this.firebase.deleteDocument(this.COLLECTION, id);
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
}
