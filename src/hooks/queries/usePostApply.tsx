import { useMutation } from "@tanstack/react-query";

import { ApplyApi } from "@/api/apply-api";
import PostApi from "@/api/post-api";

export function usePostApply(postId: string) {
  return useMutation({
    mutationFn: () => ApplyApi.postApply(postId),
  });
}
