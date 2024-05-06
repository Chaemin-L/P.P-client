import { useQuery } from "@tanstack/react-query";

import PostApi from "@/api/post-api";

const CACHE_KEY = "post-detail";

export function useGetPostDetail(postId: string) {
  return useQuery({
    queryKey: [CACHE_KEY, postId],
    queryFn: () => PostApi.getPostDetail(postId),
  });
}
