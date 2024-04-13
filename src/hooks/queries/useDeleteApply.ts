import { useMutation } from "@tanstack/react-query";

import { ApplyApi } from "@/api/apply-api";

export function useDeleteApply(postId: string) {
  return useMutation({
    mutationFn: () => ApplyApi.deleteApply(postId),
  });
}
