import { useQuery } from "@tanstack/react-query";
import UserApi from "../../api/user-api";
import { AxiosError } from "axios";
import { TUser } from "./types/user-type";

export const useUserData = (userId: string) => {
  return useQuery<TUser[], AxiosError>({
    queryKey: ["user", userId],
    queryFn: () => UserApi.getUserData(userId),
  });
};
