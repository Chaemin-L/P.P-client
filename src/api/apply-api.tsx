import Instance from "./axios-instance";

export class ApplyApi {
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

  static async deleteApply(postId: string) {
    const response = await Instance.delete(
      `/haetsal-service/api/v2/market/post/${postId}/apply`,
    );
    if (response) {
      return response.status;
    } else {
      throw new Error("Invalid response from server");
    }
  }
}
