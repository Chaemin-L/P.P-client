import { AxiosResponse } from "axios";

import Instance from "./axios-instance";
import { ChatGetResponse } from "./type";

export default class ChatApi {
  static async getChatMessages(roomIdx: number): Promise<ChatGetResponse> {
    const response: AxiosResponse<ChatGetResponse> = await Instance.get(
      `/chat/room/${roomIdx}/messages`,
    );
    return response.data;
  }
}
