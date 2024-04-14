import axios, { AxiosResponse } from "axios";

import Instance from "./axios-instance";
import {
  ChatListResponse,
  ChatMemberResponse,
  ChatRoomMessageList,
  ChatSendResponse,
} from "./types/chat-type";

export default class ChatApi {
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
    console.log(response);
    if (response) {
      const temp = response.data as ChatListResponse;
      return temp.result;
    } else {
      throw new Error("Invalid response from server");
    }
  }

  static async getChatMessages(chatRoomId: string) {
    const response = await axios.get(
      `${process.env.REACT_APP_CHAT_API_BASE_URL}:${process.env.REACT_APP_CHAT_API_PORT}/api/chats/${chatRoomId}`,
      {
        headers: {
          userId: "2",
          Authorization: localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    console.log(response);
    if (response) {
      const temp = response.data as ChatRoomMessageList;
      return temp.result;
    } else {
      throw new Error("Invalid response from server");
    }
  }

  static async getChatMembers(chatRoomId: string) {
    const response = await axios.get(
      `${process.env.REACT_APP_CHAT_API_BASE_URL}:${process.env.REACT_APP_CHAT_API_PORT}/api/chats/${chatRoomId}/members`,
      {
        headers: {
          userId: "2",
          Authorization: localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    console.log(response);
    if (response) {
      const temp = response.data as ChatMemberResponse;
      return temp.result.userIds;
    } else {
      throw new Error("Invalid response from server");
    }
  }
}
