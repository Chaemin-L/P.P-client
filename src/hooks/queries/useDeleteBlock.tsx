import { useMutation } from "@tanstack/react-query";

import BlockApi from "@/api/block-api";

export const useDeleteBlock = () => {
  return useMutation({
    mutationFn: (userId: number) => BlockApi.deleteBlock(userId),
  });
};
