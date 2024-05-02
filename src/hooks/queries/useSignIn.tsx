import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import AuthApi from "@/api/auth-api";

export const useSignIn = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: { type: string; token: string }) =>
      AuthApi.postSignIn(data.type, data.token),
    onSuccess: (response) => {
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("userId", response.userId.toString());
      localStorage.setItem("role", response.role);
      sessionStorage.removeItem("isLoading"); // when google login provider redirects to login page, show loading state
      if (response.role !== "ROLE_USER") navigate("/profile");
      else navigate("/post");
    },
  });
};
