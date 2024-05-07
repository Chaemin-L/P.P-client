import { useMutation } from "@tanstack/react-query";

import PostApi from "@/api/post-api";

export function usePostRollback() {
  return useMutation({
    mutationFn: (postId: string) => PostApi.postRollback(postId),
  });
}
