import Instance from "./axios-instance";
import { FinalResponse } from "./types/common-type";
import {
  RequestPostingProps,
  ResponsePostListProps,
  ResponsePostingProps,
  ResponsePostDetail,
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

  // static async getPostDetail(postId: string) {
  //   const response = await Instance.get<ResponsePostDetail>(
  //     `/haetsal-service/api/v2/market/post/${postId}`,
  //   )
  //     .then((res) => res.data)
  //     .catch((e) => console.log(e));
  //   console.log(response);
  //   if (response) {
  //     return response.data;
  //   } else {
  //     throw new Error("Invalid response from server");
  //   }
  // }

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
}
