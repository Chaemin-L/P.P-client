import Instance from "./axios-instance";
import { PostingProps } from "./type";

export default class PostApi {
  static async postPosting(data: PostingProps) {
    const response = await Instance.post(
      "/haetsal-service/api/v2/market/post",
      { request: data },
    );

    return response.status;
  }
}
