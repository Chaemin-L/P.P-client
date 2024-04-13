import Instance from "./axios-instance";
import {
  PostType,
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
    const response = await Instance.get("/haetsal-service/api/v2/market/post");

    if (response) {
      const temp = response.data as ResponsePostListProps;
      return temp.data;
    } else {
      throw new Error("Invalid response from server");
    }
  }

  static async getUserActivity(type: string) {
    const response = await Instance.get(
      `/haetsal-service/api/v2/market/post/user-activity/${type}`,
    );

    if (response) {
      const temp = response.data as ResponsePostListProps;
      return temp.data;
    } else {
      throw new Error("Invalid response from server");
    }
  }
}
