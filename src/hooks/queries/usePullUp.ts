import { useMutation } from "@tanstack/react-query";

import PostApi from "@/api/post-api";

export function usePullUp(postId: string) {
  return useMutation({ mutationFn: () => PostApi.pullUp(postId) });
}
