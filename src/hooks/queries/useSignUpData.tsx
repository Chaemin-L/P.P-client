import { useMutation, useQuery } from "@tanstack/react-query";
import UserApi from "../../api/user-api";
import { AxiosError } from "axios";
import { TUser } from "./types/user-type";

export const useSignUp = (a: string, b: string) => {
  return useMutation<TUser[], AxiosError, { a: string; b: string }>({
    mutationFn: async (data) => UserApi.postUserData(data.a, data.b),
  });
};
