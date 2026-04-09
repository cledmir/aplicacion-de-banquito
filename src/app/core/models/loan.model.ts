import { LoanStatus } from '../enums';

export interface Loan {
  id: string;
  fundId: string;
  participantId: string;
  participantName: string;
  amount: number;
  installmentCount: number;
  monthlyPayment: number;
  totalToPay: number;
  interestGenerated: number;
  startMonth: string;
  endMonth: string;
  status: LoanStatus;
  isLateEntryLoan: boolean;
  installments: LoanInstallment[];
  createdAt: Date;
}

export interface LoanInstallment {
  month: string;
  amount: number;
  paid: boolean;
  paidAt: Date | null;
}

export interface CreateLoanRequest {
  fundId: string;
  participantId: string;
  participantName: string;
  amount: number;
  installmentCount: number;
  startMonth: string;
  isLateEntryLoan: boolean;
}

export interface LoanCalculation {
  monthlyPayment: number;
  totalToPay: number;
  interestGenerated: number;
  installments: LoanInstallment[];
}
