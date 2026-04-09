import { Injectable } from '@angular/core';
import { where, orderBy } from 'firebase/firestore';
import { FirebaseService } from '../services/firebase.service';
import type { Participant, CreateParticipantRequest } from '../../core/models';

@Injectable({
  providedIn: 'root',
})
export class ParticipantRepository {
  private readonly COLLECTION = 'participants';

  constructor(private readonly firebase: FirebaseService) {}

  async create(request: CreateParticipantRequest): Promise<string> {
    const optionsPerMonth: Record<string, number> = {};
    optionsPerMonth[request.startMonth] = request.initialOptions;

    const data = {
      fundId: request.fundId,
      userId: request.userId,
      name: request.name,
      optionsPerMonth,
      isLateEntry: false,
      joinedAt: new Date(),
    };

    return this.firebase.addDocument(this.COLLECTION, data);
  }

  async getById(id: string): Promise<Participant | null> {
    const data = await this.firebase.getDocument(this.COLLECTION, id);
    return data ? this.mapToParticipant(data) : null;
  }

  async getByFund(fundId: string): Promise<Participant[]> {
    const docs = await this.firebase.getDocuments(
      this.COLLECTION,
      where('fundId', '==', fundId),
    );
    return docs
      .map((d) => this.mapToParticipant(d))
      .sort((a, b) => a.joinedAt.getTime() - b.joinedAt.getTime());
  }

  async getByUser(userId: string): Promise<Participant[]> {
    const docs = await this.firebase.getDocuments(
      this.COLLECTION,
      where('userId', '==', userId),
    );
    return docs.map((d) => this.mapToParticipant(d));
  }

  async updateOptions(
    id: string,
    month: string,
    options: number,
  ): Promise<void> {
    const participant = await this.getById(id);
    if (!participant) throw new Error('Participante no encontrado');

    const updatedOptions = { ...participant.optionsPerMonth, [month]: options };
    await this.firebase.updateDocument(this.COLLECTION, id, {
      optionsPerMonth: updatedOptions,
    });
  }

  async fillOptionsForMonths(
    id: string,
    months: string[],
    options: number,
  ): Promise<void> {
    const participant = await this.getById(id);
    if (!participant) throw new Error('Participante no encontrado');

    const updatedOptions = { ...participant.optionsPerMonth };
    for (const month of months) {
      if (!updatedOptions[month]) {
        updatedOptions[month] = options;
      }
    }
    await this.firebase.updateDocument(this.COLLECTION, id, {
      optionsPerMonth: updatedOptions,
    });
  }

  async markAsLateEntry(id: string): Promise<void> {
    await this.firebase.updateDocument(this.COLLECTION, id, {
      isLateEntry: true,
    });
  }

  async delete(id: string): Promise<void> {
    await this.firebase.deleteDocument(this.COLLECTION, id);
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
}
