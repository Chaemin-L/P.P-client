import { useQuery } from "@tanstack/react-query";

import ProfileApi from "@/api/profile-api";

export const useGetProfile = (userId?: number) => {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () =>
      userId ? ProfileApi.getProfile(userId) : ProfileApi.getProfile(),
  });
};
