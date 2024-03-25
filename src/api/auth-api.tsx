import { AxiosResponse } from "axios";

import Instance from "./axios-instance";
import { AuthResponse } from "./type";

export default class AuthApi {
  static async postSignIn(type: string, token: string) {
    const response = await Instance.post(
      `/auth-service/api/v2/auth/signin/${type}`,
      { token: token },
    );
    return response.data as AuthResponse;
  }
}
