import { Injectable } from '@angular/core';
import { where, orderBy } from 'firebase/firestore';
import { FirebaseService } from '../services/firebase.service';
import { FundStatus } from '../../core/enums';
import type { Period, CreatePeriodRequest } from '../../core/models';
import { DateUtils } from '../../core/utils';

@Injectable({
  providedIn: 'root',
})
export class PeriodRepository {
  private readonly COLLECTION = 'periods';

  constructor(private readonly firebase: FirebaseService) {}

  async create(request: CreatePeriodRequest, adminUid: string): Promise<string> {
    const months = DateUtils.generatePeriodMonths(request.startDate, request.endDate);

    const data = {
      name: request.name,
      startDate: request.startDate,
      endDate: request.endDate,
      status: FundStatus.ACTIVE,
      adminUid,
      months,
      createdAt: new Date(),
    };

    return this.firebase.addDocument(this.COLLECTION, data);
  }

  async getById(id: string): Promise<Period | null> {
    const data = await this.firebase.getDocument(this.COLLECTION, id);
    return data ? this.mapToPeriod(data) : null;
  }

  async getAll(): Promise<Period[]> {
    const docs = await this.firebase.getDocuments(this.COLLECTION);
    return docs
      .map((d) => this.mapToPeriod(d))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getActive(): Promise<Period[]> {
    const docs = await this.firebase.getDocuments(
      this.COLLECTION,
      where('status', '==', FundStatus.ACTIVE),
    );
    return docs.map((d) => this.mapToPeriod(d));
  }

  async closePeriod(id: string): Promise<void> {
    await this.firebase.updateDocument(this.COLLECTION, id, {
      status: FundStatus.CLOSED,
    });
  }

  private mapToPeriod(data: Record<string, unknown>): Period {
    return {
      id: data['id'] as string,
      name: data['name'] as string,
      startDate: (data['startDate'] as { toDate?: () => Date })?.toDate?.() ?? new Date(),
      endDate: (data['endDate'] as { toDate?: () => Date })?.toDate?.() ?? new Date(),
      status: data['status'] as FundStatus,
      adminUid: data['adminUid'] as string,
      months: (data['months'] as string[]) ?? [],
      createdAt: (data['createdAt'] as { toDate?: () => Date })?.toDate?.() ?? new Date(),
    };
  }
}
