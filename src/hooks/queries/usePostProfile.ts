import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import ProfileApi from "@/api/profile-api";
import {
  ProfilePostRequest,
  ProfilePostResponse,
} from "@/api/types/profile-type";

export function usePostProfile() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (profile: ProfilePostRequest) =>
      ProfileApi.postProfile(profile),
    onSuccess: (response: ProfilePostResponse) => {
      const { accessToken, refreshToken, role } = response.data.tokenInfo;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("role", role);
      navigate("/post");
    },
  });
}
