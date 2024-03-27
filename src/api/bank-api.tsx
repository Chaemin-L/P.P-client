import Instance from "./axios-instance";
import { BankDataResponse } from "./type";

class BankApi {
  static async getBankData() {
    const response = await Instance.get(`/haetsal-service/api/v2/back/account`);
    const res = response.data as BankDataResponse;
    return res.data;
  }
}

export default BankApi;
