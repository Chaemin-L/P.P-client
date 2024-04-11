import { useMutation } from "@tanstack/react-query";

import BlockApi from "@/api/block-api";

export const usePostBlock = () => {
  return useMutation({
    mutationFn: (userId: number) => BlockApi.postBlock(userId),
  });
};
