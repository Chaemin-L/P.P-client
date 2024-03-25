import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import AuthApi from "@/api/auth-api";
import { AuthResponse } from "@/api/type";

export const useSignIn = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: { type: string; token: string }) =>
      AuthApi.postSignIn(data.type, data.token),
    onSuccess: (response) => {
      console.log("로그인 성공", response.role);
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      navigate("/login/end");
    },
  });
};
