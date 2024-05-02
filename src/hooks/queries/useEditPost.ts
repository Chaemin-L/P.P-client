import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import PostApi from "@/api/post-api";
import { postEditState } from "@/recoil/atoms/post-edit-state";

export function useEditPost(postId: string) {
  const ePost = useRecoilValue(postEditState);
  console.log(ePost);

  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => PostApi.editPost(postId, ePost),
    onSuccess: () => {
      // void queryClient.invalidateQueries({ queryKey: ["post-detail"] });
      navigate(`/post/${postId}`);
    },
    onError: (e) => {
      console.log(e);
    },
  });
}
