import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import PostApi from "@/api/post-api";

export function useDeletePost(postId: string) {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => PostApi.deletePost(postId),
    onSuccess: () => navigate(-1),
  });
}
