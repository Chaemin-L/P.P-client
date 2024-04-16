import { useMutation } from "@tanstack/react-query";

import PostApi from "@/api/post-api";

export const usePostReport = () => {
  return useMutation({
    mutationFn: (postId: string) => PostApi.reportPosting(postId),
  });
};
