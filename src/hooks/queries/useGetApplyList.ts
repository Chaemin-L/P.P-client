import { useQuery } from "@tanstack/react-query";

import { ApplyApi } from "@/api/apply-api";

export function useGetApplyList(postId: string) {
  return useQuery({
    queryKey: ["apply-list"],
    queryFn: () => ApplyApi.getApplyList(postId),
  });
}
