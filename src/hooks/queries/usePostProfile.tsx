import { useMutation } from "@tanstack/react-query";

import ProfileApi from "@/api/profile-api";

export function userPostProfile() {
  return useMutation({ mutationFn: () => ProfileApi.postProfile() });
}
