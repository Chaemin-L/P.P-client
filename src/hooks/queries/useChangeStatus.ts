import { useMutation } from "@tanstack/react-query";

import PostApi from "@/api/post-api";
import { StatusType } from "@/api/types/post-type";

export function useChangeStatus(postId: string) {
  return useMutation({
    mutationFn: (status: StatusType) => PostApi.chanchStatus(postId, status),
  });
}
