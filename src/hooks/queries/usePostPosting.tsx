import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import PostApi from "@/api/post-api";
import { RequestPostingProps } from "@/api/type";

export const usePostPosting = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: RequestPostingProps) => PostApi.postPosting(data),
    onSuccess: (response) => {
      localStorage.setItem("postId", response.data.postId.toString());
      navigate("/posting/8");
    },
  });
};
