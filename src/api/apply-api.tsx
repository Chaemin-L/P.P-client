import Instance from "./axios-instance";
import { ApplyType } from "./types/apply-type";
import { FinalResponse } from "./types/common-type";

export class ApplyApi {
  static async getApplyList(postId: string) {
    const response = await Instance.get(
      `/haetsal-service/api/v2/market/post/${postId}/apply`,
    ).then((res) => res.data as FinalResponse<ApplyType[]>);
    if (response) {
      return response.data;
    } else {
      throw new Error("Invalid response from server");
    }
  }

  static async postApplyAccept(postId: string, applyIds: number[]) {
    const response = await Instance.post(
      `/haetsal-service/api/v2/market/post/${postId}/accept`,
      {
        applyIds,
      },
    );
    if (response) return response.status;
    else throw new Error("Invalid response from server");
  }

  static async postApply(postId: string) {
    const response = await Instance.post(
      `/haetsal-service/api/v2/market/post/${postId}/apply`,
      {
        introduction: "",
      },
    );
    if (response) {
      return response.status;
    } else {
      throw new Error("Invalid response from server");
    }
  }

  static async deleteApply(postId: string, applyId: number, userId: number) {
    const response = await Instance.delete(
      `/haetsal-service/api/v2/market/post/${postId}/apply/${applyId}/${userId}`,
    );
    if (response) {
      return response.status;
    } else {
      throw new Error("Invalid response from server");
    }
  }
}
