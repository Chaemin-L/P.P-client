import Instance from "./axios-instance";
import {
  RequestPostingProps,
  ResponsePostingProps,
} from "./types/posting-type";

export default class PostApi {
  static async postPosting(data: RequestPostingProps) {
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

  static async reportPosting(postId: string) {
    const response = await Instance.post(
      `/haetsal-service/api/v2/market/post/${postId}/report`,
    );
    return response.status;
  }
}
