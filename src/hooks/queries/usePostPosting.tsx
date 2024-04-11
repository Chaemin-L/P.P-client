import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import PostApi from "@/api/post-api";
import { RequestPostingProps } from "@/api/types/post-type";

export const usePostPosting = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: RequestPostingProps) => PostApi.postPosting(data),
    onSuccess: (response) => {
      navigate("/posting/8", { state: { postId: response.data.postId } });
    },
  });
};
