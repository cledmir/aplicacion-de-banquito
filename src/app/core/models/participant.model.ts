export interface Participant {
  id: string;
  fundId: string;
  userId: string;
  name: string;
  optionsPerMonth: Record<string, number>; // { 'dic-2024': 1, 'ene-2025': 2 }
  isLateEntry: boolean;
  joinedAt: Date;
}

export interface CreateParticipantRequest {
  fundId: string;
  userId: string;
  name: string;
  initialOptions: number;
  startMonth: string;
}

export interface ParticipantMonthlySummary {
  participantId: string;
  participantName: string;
  options: number;
  contributionAmount: number;
  loanPaymentsAmount: number;
  totalDue: number;
  isPaid: boolean;
}
