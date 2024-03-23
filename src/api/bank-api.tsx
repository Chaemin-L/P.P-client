import Instance from "./axios-instance";

class BankApi {
  static async getBankData(userId: string) {
    return await Instance.get(`/users/${userId}`).then((res) => res.data);
  }
}

export default BankApi;
