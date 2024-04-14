import { FinalResponse } from "./common-type";

export type BankAccountData = {
  accountNumber: string;
  totalBudget: number;
  availableBudget: number;
  isBlocked: boolean;
};

export type BankDataResponse = FinalResponse<BankAccountData>;
