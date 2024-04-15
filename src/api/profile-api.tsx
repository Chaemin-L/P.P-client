import Instance from "./axios-instance";
import { ProfileGetResponse, ProfilePostResponse } from "./types/profile-type";

export default class ProfileApi {
  static async getProfile(userId?: number) {
    const response = userId
      ? await Instance.get(`/haetsal-service/api/v2/profile?id=${userId}`)
      : await Instance.get(`/haetsal-service/api/v2/profile`);
    if (response && response.data) {
      const res = response.data as ProfileGetResponse;
      return res.data;
    } else {
      throw new Error("Invalid response from server");
    }
  }

  static async postProfile(profile: FormData) {
    return await Instance.post("/auth-service/api/v2/profile", profile, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => res.data as ProfilePostResponse)
      .catch(() => {
        throw new Error("Invalid response from server");
      });
  }
}
