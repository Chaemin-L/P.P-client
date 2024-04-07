import Instance from "./axios-instance";
import { ProfileDataResponse } from "./types/profile-type";

export default class ProfileApi {
  static async getProfile(userId?: number) {
    const response = userId
      ? await Instance.get(`/haetsal-service/api/v2/profile`, {
          headers: { userId: userId },
        })
      : await Instance.get(`/haetsal-service/api/v2/profile`);
    if (response && response.data) {
      const res = response.data as ProfileDataResponse;
      return res.data;
    } else {
      throw new Error("Invalid response from server");
    }
  }
}
