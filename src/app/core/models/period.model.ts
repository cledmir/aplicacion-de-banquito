import { FundStatus } from '../enums';

export interface Period {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  status: FundStatus;
  adminUid: string;
  months: string[]; // ['dic-2024', 'ene-2025', ..., 'dic-2025']
  createdAt: Date;
}

export interface CreatePeriodRequest {
  name: string;
  startDate: Date;
  endDate: Date;
}
