import axios, { AxiosResponse } from "axios";

import Instance from "./axios-instance";
import {
  ChatGetResponse,
  ChatListItem,
  ChatSendResponse,
} from "./types/chat-type";

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

  static async getChatList() {
    const response = await axios.get(
      `${process.env.REACT_APP_CHAT_API_BASE_URL}:${process.env.REACT_APP_CHAT_API_PORT}/api/chats`,
      {
        headers: {
          userId: "2",
          Authorization: localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );

    if (response) {
      return response.data as ChatListItem[];
    } else {
      throw new Error("Invalid response from server");
    }
  }
}
