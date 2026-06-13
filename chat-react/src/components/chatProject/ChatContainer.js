import React, { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";
import Sidebar from "./Sidebar";

function ChatContainer({ socket, isConnected, currentUsername }) {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    // Listen for incoming messages
    const handleMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    // Listen for user list updates
    const handleUserList = (data) => {
      setUsers(data.users || []);
      setUserCount(data.count || 0);
    };

    socket.on("message", handleMessage);
    socket.on("user_list", handleUserList);

    return () => {
      socket.off("message", handleMessage);
      socket.off("user_list", handleUserList);
    };
  }, [socket]);

  const handleSendMessage = (message) => {
    socket.emit("send_message", { message });
  };

  return (
    <div className="container">
      <div className="chat-area-wrapper">
        <ChatHeader isConnected={isConnected} />

        <div className="main-content">
          <div className="chat-area">
            <MessagesList
              messages={messages}
              currentUsername={currentUsername}
            />
            <MessageInput onSendMessage={handleSendMessage} />
          </div>

          <Sidebar users={users} userCount={userCount} />
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
