import { useQuery } from "@tanstack/react-query";

import PostApi from "@/api/post-api";
import { PostDetailType } from "@/api/types/post-type";

const CACHE_KEY = "post-detail";

export function useGetPostDetail(postId: string) {
  return useQuery({
    queryKey: [CACHE_KEY, postId],
    queryFn: () => PostApi.getPostDetail(postId),
  });
}
