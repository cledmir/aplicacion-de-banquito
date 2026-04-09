export interface Lottery {
  id: string;
  fundId: string;
  month: string;
  applicantIds: string[];
  applicantNames: string[];
  winnerIds: string[];
  winnerNames: string[];
  amountAvailable: number;
  amountPerWinner: number;
  createdAt: Date;
}

export interface CreateLotteryRequest {
  fundId: string;
  month: string;
  applicantIds: string[];
  applicantNames: string[];
  amountAvailable: number;
}

export interface LotteryResult {
  winnerIds: string[];
  winnerNames: string[];
  amountPerWinner: number;
}
