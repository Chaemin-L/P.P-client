import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export const Chatting = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  let stompClient: Stomp.Client | null = null;

  useEffect(() => {
    const connectToWebSocket = () => {
      const socket = new SockJS("http://localhost:8080/chat-websocket");
      stompClient = Stomp.over(socket);

      stompClient.connect({}, () => {
        stompClient.subscribe(
          "/sub/room/{roomIdx}",
          (message: { body: string }) => {
            setMessages((prevMessages) => [
              ...prevMessages,
              JSON.parse(message.body),
            ]);
          },
        );
      });
    };

    connectToWebSocket();

    // 페이지가 닫힐 때 웹소켓 연결을 닫지 않고 유지
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);
};
