import Instance from "./axios-instance";

class UserApi {
  static async getUserData(userId: string) {
    return await Instance.get(`/users/${userId}`).then((res) => res.data);
  }

  static async postUserData(a: string, b: string) {
    return await Instance.post(`/users/signup`, { a: a, b: b }).then(
      (res) => res.data,
    );
  }
}

export default UserApi;
