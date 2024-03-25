import { AxiosResponse } from "axios";

import Instance from "./axios-instance";
import { UserResponse } from "./type";

class UserApi {
  static async getUserData(userId: string): Promise<UserResponse[]> {
    const response: AxiosResponse<UserResponse> = await Instance.get(
      `/bank/users/${userId}`,
    );
    return [response.data];
  }

  static async postUserData(a: string, b: string): Promise<UserResponse> {
    const response: AxiosResponse<UserResponse> = await Instance.post(
      `/users/signup`,
      { a: a, b: b },
    );
    return response.data;
  }
}

export default UserApi;
