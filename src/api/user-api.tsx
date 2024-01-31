import Instance from "./axios-instance";

class UserApi {
  static async getUserData(userId: string) {
    return await Instance.get("/users/${userId}").then((res) => res.data);
  }
}

export default UserApi;
