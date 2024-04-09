import { useQuery } from "@tanstack/react-query";

import PostApi from "@/api/post-api";

export const useGetPostList = () => {
  return useQuery({
    queryKey: ["postList"],
    queryFn: () => PostApi.getPostList(),
  });
};
