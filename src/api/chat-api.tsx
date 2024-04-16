import { AxiosResponse } from "axios";

import Instance from "./axios-instance";
import { ChatGetResponse, ChatSendResponse } from "./types/chat-type";

export default class ChatApi {
  static async getChatMessages(roomIdx: number): Promise<ChatGetResponse[]> {
    const response: AxiosResponse<ChatGetResponse> = await Instance.get(
      `/chat/room/${roomIdx}/messages`,
    );
    return [response.data];
  }

  static async sendChatMessages({
    roomIdx,
    senderName,
    senderUuid,
    message,
  }: ChatSendResponse): Promise<ChatSendResponse> {
    const response: AxiosResponse<ChatSendResponse> = await Instance.post(
      `/chat/room/${roomIdx}/messages`,
      {
        roomIdx: roomIdx,
        senderName: senderName,
        senderUuid: senderUuid,
        message: message,
      },
    );
    return response.data;
  }
}
