import { AxiosResponse } from "axios";

import Instance from "./axios-instance";
import { BankGetResponse } from "./type";

class BankApi {
  static async getBankData(userId: string): Promise<BankGetResponse> {
    const response: AxiosResponse<BankGetResponse> = await Instance.get(
      `/bank/users/${userId}`,
    );
    return response.data;
  }
}

export default BankApi;
