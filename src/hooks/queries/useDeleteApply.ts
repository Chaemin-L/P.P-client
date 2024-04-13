import { useMutation } from "@tanstack/react-query";

import { ApplyApi } from "@/api/apply-api";
import { queryClient } from "@/index";

export function useDeleteApply(postId: string) {
  return useMutation({
    mutationFn: () => ApplyApi.deleteApply(postId),
    onSuccess: () => queryClient.invalidateQueries(),
  });
}
