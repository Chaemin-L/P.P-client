import Instance from "./axios-instance";
import { ProfileDataResponse } from "./type";

export default class ProfileApi {
  static async getProfile() {
    try {
      const response = await Instance.get(
        `/haetsal-service/api/v2/bank/account`,
      );
      console.log("Response", response);
      if (response && response.data) {
        const res = response.data as ProfileDataResponse;
        return res.data;
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error fetching bank data:", error);
      throw error;
    }
  }
}
