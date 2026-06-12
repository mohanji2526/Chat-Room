import React from "react";

function ChatHeader({ isConnected }) {
  return (
    <div className="chat-header">
      <h1>💬 Chat Room</h1>
      <div
        className={`connection-status ${isConnected ? "connected" : "disconnected"}`}
      >
        {isConnected ? "● Connected" : "● Disconnected"}
      </div>
    </div>
  );
}

export default ChatHeader;
