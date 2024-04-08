import { FinalResponse } from "./common-type";

export type BankDataResponse = FinalResponse<{
  accountNumber: string;
  totalBudget: number;
  availableBudget: number;
  isBlocked: boolean;
}>;
