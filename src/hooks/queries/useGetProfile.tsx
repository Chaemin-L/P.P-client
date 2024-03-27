import { useQuery } from "@tanstack/react-query";

import ProfileApi from "@/api/profile-api";

export const useGetProfile = () => {
  return useQuery({
    queryKey: [],
    queryFn: () => ProfileApi.getProfile(),
    staleTime: 60000,
  });
};
