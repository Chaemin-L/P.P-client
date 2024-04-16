import { useMutation } from "@tanstack/react-query";

import BankApi from "@/api/bank-api";
import { transferRequestApiProps } from "@/api/types/bank-type";

export const usePostChatTransfer = () => {
  return useMutation({
    mutationFn: (data: transferRequestApiProps) =>
      BankApi.postChatTransfer(data),
  });
};
