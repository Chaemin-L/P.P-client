import { useQuery } from "@tanstack/react-query";

import PostApi from "@/api/post-api";

export const useGetMypostList = (type: string) => {
  return useQuery({
    queryKey: ["postList", { type: type }],
    queryFn: () => PostApi.getUserActivity(type),
  });
};
