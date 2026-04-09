import { Injectable } from '@angular/core';
import { where, orderBy } from 'firebase/firestore';
import { FirebaseService } from '../services/firebase.service';
import { FundStatus, FundType } from '../../core/enums';
import type { Fund, CreateFundRequest } from '../../core/models';

@Injectable({
  providedIn: 'root',
})
export class FundRepository {
  private readonly COLLECTION = 'funds';

  constructor(private readonly firebase: FirebaseService) {}

  async create(request: CreateFundRequest, adminUid: string): Promise<string> {
    const data = {
      periodId: request.periodId,
      name: request.name,
      type: request.type,
      interestRate: request.interestRate,
      optionValue: request.optionValue,
      currency: 'PEN',
      status: FundStatus.ACTIVE,
      totalOptions: 0,
      adminUid,
      createdAt: new Date(),
    };

    return this.firebase.addDocument(this.COLLECTION, data);
  }

  async getById(id: string): Promise<Fund | null> {
    const data = await this.firebase.getDocument(this.COLLECTION, id);
    return data ? this.mapToFund(data) : null;
  }

  async getAll(): Promise<Fund[]> {
    const docs = await this.firebase.getDocuments(this.COLLECTION);
    return docs
      .map((d) => this.mapToFund(d))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getActive(): Promise<Fund[]> {
    const docs = await this.firebase.getDocuments(
      this.COLLECTION,
      where('status', '==', FundStatus.ACTIVE),
    );
    return docs
      .map((d) => this.mapToFund(d))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getByPeriod(periodId: string): Promise<Fund[]> {
    const docs = await this.firebase.getDocuments(
      this.COLLECTION,
      where('periodId', '==', periodId),
    );
    return docs.map((d) => this.mapToFund(d));
  }

  async update(id: string, data: Partial<Fund>): Promise<void> {
    await this.firebase.updateDocument(this.COLLECTION, id, data);
  }

  async updateTotalOptions(id: string, totalOptions: number): Promise<void> {
    await this.firebase.updateDocument(this.COLLECTION, id, { totalOptions });
  }

  async closeFund(id: string): Promise<void> {
    await this.firebase.updateDocument(this.COLLECTION, id, {
      status: FundStatus.CLOSED,
    });
  }

  async delete(id: string): Promise<void> {
    await this.firebase.deleteDocument(this.COLLECTION, id);
  }

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
}
