import React, { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const socketUrl = "ws://localhost:3000/cable";

const Notification = () => {
  const [messageHistory, setMessageHistory] = useState([]);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      if (data?.message?.data) {
        setMessageHistory((prev) => prev.concat(data?.message?.data));
      }
    }
  }, [lastMessage, setMessageHistory]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    sendMessage(
      JSON.stringify({
        command: "subscribe",
        identifier: '{"channel":"NotificationChannel"}',
      })
    );
  }, []);

  console.log(connectionStatus);

  return (
    <div>
      <ul>
        {messageHistory.map((message, idx) => (
          <li key={idx}>
            <span>{message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
