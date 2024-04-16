import { useMutation } from "@tanstack/react-query";

import PostApi from "@/api/post-api";

export const usePostReport = () => {
  return useMutation({
    mutationFn: (data: { postId: string; reportMsg: string }) =>
      PostApi.reportPosting(data),
  });
};
