import Instance from "./axios-instance";
import {
  RequestPostingProps,
  ResponsePostListProps,
  ResponsePostingProps,
} from "./types/post-type";

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

  static async getPostList() {
    const reponse = await Instance.get("/haetsal-service/api/v2/market/post");

    if (reponse) {
      const temp = reponse.data as ResponsePostListProps;
      return temp.data;
    } else {
      throw new Error("Invalid response from server");
    }
  }

  static async getUserActivity(type: string) {
    const reponse = await Instance.get(
      `/haetsal-service/api/v2/market/post/user-activity/${type}`,
    );

    if (reponse) {
      const temp = reponse.data as ResponsePostListProps;
      return temp.data;
    } else {
      throw new Error("Invalid response from server");
    }
  }
}
