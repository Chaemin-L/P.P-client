import { useMutation } from "@tanstack/react-query";

import { ApplyApi } from "@/api/apply-api";

export function usePostApplyAccept(postId: string) {
  return useMutation({
    mutationFn: (applyIds: number[]) =>
      ApplyApi.postApplyAccept(postId, applyIds),
  });
}
