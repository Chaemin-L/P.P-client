import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { UserResponse } from "@/api/type";
import UserApi from "@/api/user-api";

export const useSignUp = () => {
  return useMutation<UserResponse, AxiosError, { a: string; b: string }>({
    mutationFn: async (data: { a: string; b: string }) =>
      UserApi.postUserData(data.a, data.b),
  });
};
