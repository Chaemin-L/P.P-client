import { useMutation } from "@tanstack/react-query";

import { ApplyApi } from "@/api/apply-api";
import { queryClient } from "@/index";

export function usePostApply(postId: string) {
  return useMutation({
    mutationFn: () => ApplyApi.postApply(postId),
    onSuccess: () => queryClient.invalidateQueries(),
  });
}
