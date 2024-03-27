import { useQuery } from "@tanstack/react-query";

import BankApi from "@/api/bank-api";

export const useGetBankData = () => {
  return useQuery({
    queryKey: [],
    queryFn: () => BankApi.getBankData(),
  });
};
