import Instance from "./axios-instance";
import { BankDataResponse } from "./type";

class BankApi {
  static async getBankData() {
    const response = await Instance.get(`/haetsal-service/api/v2/bank/account`);
    if (response && response.data) {
      const res = response.data as BankDataResponse;
      return res.data;
    } else {
      throw new Error("Invalid response from server");
    }
  }
}

export default BankApi;
