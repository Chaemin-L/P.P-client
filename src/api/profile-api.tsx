import Instance from "./axios-instance";
import {
  ProfileGetResponse,
  ProfilePostRequest,
  ProfilePostResponse,
} from "./types/profile-type";

export default class ProfileApi {
  static async getProfile(userId?: number) {
    const response = userId
      ? await Instance.get(
          `/haetsal-service/api/v2/profile?otherUserId=${userId}`,
        )
      : await Instance.get(`/haetsal-service/api/v2/profile`);
    if (response && response.data) {
      const res = response.data as ProfileGetResponse;
      return res.data;
    } else {
      throw new Error("Invalid response from server");
    }
  }

  static async postProfile(profile: ProfilePostRequest) {
    return await Instance.post("/auth-service/api/v2/profile", profile)
      .then((res) => res.data as ProfilePostResponse)
      .catch(() => {
        throw new Error("Invalid response from server");
      });
  }
}
