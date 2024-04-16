import { FinalResponse } from "./common-type";

export type BankAccountData = {
  accountNumber: string;
  totalBudget: number;
  availableBudget: number;
  isBlocked: boolean;
};

export type BankDataResponse = FinalResponse<BankAccountData>;

export type transferChatEach = {
  receiverAccountNumber: string;
  amount: number;
};

export type transferRequest = {
  dealId: number;
  password: string;
  receiverAndAmounts: transferChatEach[];
  totalAmount: number;
};

export type transferRequestApiProps = {
  postId: string;
  transferRequest: transferRequest;
};
