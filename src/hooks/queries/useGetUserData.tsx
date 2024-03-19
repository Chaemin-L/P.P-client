import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { UserResponse } from "@/api/type";
import UserApi from "@/api/user-api";

export const useUserData = (userId: string) => {
  return useQuery<UserResponse[], AxiosError>({
    queryKey: ["user", userId],
    queryFn: () => UserApi.getUserData(userId),
  });
};
