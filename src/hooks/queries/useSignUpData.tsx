import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { UserResponse } from "@/api/type";
import UserApi from "@/api/user-api";

export const useSignUp = () => {
  return useMutation({
    mutationFn: async (data: { a: string; b: string }) =>
      UserApi.postUserData(data.a, data.b),
  });
};
