import React from "react";

function Message({ data, currentUsername }) {
  const isUserMessage = data.username === currentUsername;
  const isSystemMessage = data.type === "system";

  const formatTime = (timestamp) => {
    return new Date(timestamp || Date.now()).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const escapeHtml = (text) => {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  };

  let messageClass = "other";
  if (isSystemMessage) {
    messageClass = "system";
  } else if (isUserMessage) {
    messageClass = "user";
  }

  return (
    <div className={`message ${messageClass}`}>
      {isSystemMessage ? (
        <div className="message-content">{escapeHtml(data.message)}</div>
      ) : (
        <div className="message-wrapper">
          <div className="message-sender">{escapeHtml(data.username)}</div>
          <div className="message-content">{escapeHtml(data.message)}</div>
          <div className="message-time">{formatTime(data.timestamp)}</div>
        </div>
      )}
    </div>
  );
}

export default Message;
