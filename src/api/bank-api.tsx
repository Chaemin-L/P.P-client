import Instance from "./axios-instance";
import { BankDataResponse, transferRequestApiProps } from "./types/bank-type";

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
  static async postChatTransfer({
    postId,
    transferRequest,
  }: transferRequestApiProps) {
    const response = await Instance.post(
      `/haetsal-service/api/v2/market/post/${postId}/chat/transfer`,
      transferRequest,
    );
    if (response) {
      return response.status;
    } else {
      throw new Error("Invalid response from server");
    }
  }
}

export default BankApi;
