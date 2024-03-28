import Instance from "./axios-instance";
import { RequestPostingProps, ResponsePostingProps } from "./type";

export default class PostApi {
  static async postPosting(data: RequestPostingProps) {
    console.log("api::::::::", data);
    const response = await Instance.post(
      "/haetsal-service/api/v2/market/post",
      data,
    );

    if (response) {
      return response.data as ResponsePostingProps;
    } else {
      throw new Error("Invalid response from server");
    }
  }
}
