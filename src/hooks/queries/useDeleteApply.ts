import { useMutation } from "@tanstack/react-query";

import { ApplyApi } from "@/api/apply-api";
import { queryClient } from "@/index";

export function useDeleteApply(postId: string) {
  return useMutation({
    mutationFn: ({ applyId, userId }: { applyId: number; userId: number }) =>
      ApplyApi.deleteApply(postId, applyId, userId),
    onSuccess: () => queryClient.invalidateQueries(),
  });
}
