import { PaymentMethod, PaymentType } from '../enums';

export interface Payment {
  id: string;
  fundId: string;
  participantId: string;
  participantName: string;
  type: PaymentType;
  loanId: string | null;
  month: string;
  amount: number;
  method: PaymentMethod;
  paid: boolean;
  paidAt: Date | null;
  createdAt: Date;
}

export interface RegisterPaymentRequest {
  fundId: string;
  participantId: string;
  participantName: string;
  type: PaymentType;
  loanId: string | null;
  month: string;
  amount: number;
  method: PaymentMethod;
}

export interface MonthlyCollection {
  month: string;
  fundId: string;
  expectedContributions: number;
  expectedLoanPayments: number;
  totalExpected: number;
  totalCollected: number;
  availableForLoan: number;
  participantSummaries: ParticipantPaymentSummary[];
}

export interface ParticipantPaymentSummary {
  participantId: string;
  participantName: string;
  contribution: number;
  loanPayments: LoanPaymentDetail[];
  totalDue: number;
  totalPaid: number;
  isPaid: boolean;
}

export interface LoanPaymentDetail {
  loanId: string;
  installmentNumber: number;
  amount: number;
  paid: boolean;
}
