import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import ProfileApi from "@/api/profile-api";

export function usePostProfile() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (profile: FormData) => ProfileApi.postProfile(profile),
    onSuccess: () => {
      localStorage.setItem("role", "ROLE_USER");
      navigate("/post");
    },
  });
}
