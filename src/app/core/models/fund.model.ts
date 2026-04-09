import { FundStatus, FundType } from '../enums';

export interface Fund {
  id: string;
  periodId: string;
  name: string;
  type: FundType;
  interestRate: number;
  optionValue: number;
  currency: string;
  status: FundStatus;
  totalOptions: number;
  createdAt: Date;
}

export interface CreateFundRequest {
  periodId: string;
  name: string;
  type: FundType;
  interestRate: number;
  optionValue: number;
}

export interface FundSummary {
  fund: Fund;
  totalParticipants: number;
  totalOptions: number;
  totalCollectedToDate: number;
  totalLentToDate: number;
  availableForLoan: number;
  totalInterestGenerated: number;
  estimatedGainPerOption: number;
}
