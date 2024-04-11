import Instance from "./axios-instance";

export default class BlockApi {
  static async postBlock(userId: number) {
    const response = await Instance.post("/haetsal-service/api/v2/block", {
      profileId: userId,
    });
    if (response) {
      return response.status;
    } else {
      throw new Error("Invalid response from server");
    }
  }

  static async deleteBlock(userId: number) {
    const response = await Instance.delete("/haetsal-service/api/v2/block", {
      data: { profileId: userId },
    });
    if (response) {
      return response.status;
    } else {
      throw new Error("Invalid response from server");
    }
  }
}
