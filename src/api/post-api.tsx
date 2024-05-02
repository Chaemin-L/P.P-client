import Instance from "./axios-instance";
import { FinalResponse } from "./types/common-type";
import {
  RequestPostingProps,
  ResponsePostListProps,
  ResponsePostingProps,
  ResponsePostDetail,
} from "./types/post-type";

export default class PostApi {
  static async deletePost(postId: string) {
    const response = await Instance.delete(
      `/haetsal-service/api/v2/market/post/${postId}`,
    );

    if (response) {
      return response.status;
    } else {
      throw new Error("Invalid response from server");
    }
  }

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

  static async reportPosting(data: { postId: string; reportMsg: string }) {
    const response = await Instance.post(
      `/haetsal-service/api/v2/market/post/${data.postId}/report`,
      { introduction: data.reportMsg },
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

  static async getPostDetail(postId: string) {
    const response = await Instance.get(
      `/haetsal-service/api/v2/market/post/${postId}`,
    );

    if (response) {
      const temp = response.data as ResponsePostDetail;
      return temp.data;
    } else {
      throw new Error("Invalid response from server");
    }
  }

  // ** deprecated **
  static async chanchStatus(postId: string, status: string) {
    const response = await Instance.put(
      `/haetsal-service/api/v2/market/post/${postId}/status`,
      { status },
    );
    if (response) {
      return response.status;
    } else {
      throw new Error("Invalid response from server");
    }
  }

  static async pullUp(postId: string) {
    const response = await Instance.put<FinalResponse>(
      `/haetsal-service/api/v2/market/post/${postId}/pull-up`,
    );
    if (response) return response.status;
    else throw new Error("Invalid response from server");
  }

  static async editPost(postId: string, ePost: object) {
    const response = await Instance.put(
      `/haetsal-service/api/v2/market/post/${postId}`,
      { ...ePost },
    );

    if (response) return response.status;
    else {
      throw new Error("Invalid response from server");
    }
  }
}
