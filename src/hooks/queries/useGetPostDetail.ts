import { useQuery } from "@tanstack/react-query";

import PostApi from "@/api/post-api";
import { PostDetailType } from "@/api/types/post-type";

const CACHE_KEY = "post-detail";

export function useGetPostDetail(postId: string) {
  return useQuery({
    queryKey: [CACHE_KEY],
    queryFn: () => PostApi.getPostDetail(postId),
    select: (data: PostDetailType) => {
      const [date, time] = data.marketPostResponse.startDate
        .split("+")[0]
        .split("T");

      const [_, mo, d] = date.split("-");
      const [h, mi, ...res] = time.split(":");
      data.marketPostResponse.startDate = [mo, d, h, mi].join(" ");
      console.log(data.marketPostResponse);
      return data;
    },
  });
}
