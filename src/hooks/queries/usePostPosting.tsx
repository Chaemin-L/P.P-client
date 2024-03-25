import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import PostApi from "@/api/post-api";
import { PostingProps } from "@/api/type";

export const usePostPosting = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: PostingProps) => PostApi.postPosting(data),
    onSuccess: () => {
      navigate(""); // 상세페이지로 이동
    },
  });
};
