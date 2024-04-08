import Instance from "./axios-instance";
import { AuthResponse } from "./types/auth-type";

export default class AuthApi {
  static async postSignIn(type: string, token: string) {
    const response = await Instance.post(
      `/auth-service/api/v2/auth/signin/${type}`,
      { token: token },
    );

    console.log(response);
    const res = response.data as AuthResponse;
    return res.data;
  }

  static async postSignInLocal(email: string, password: string) {
    const response = await Instance.post(
      `/auth-service/api/v2/auth/signin/local`,
      { email: email, password: password },
    );

    console.log(response);
    const res = response.data as AuthResponse;
    return res.data;
  }
}
