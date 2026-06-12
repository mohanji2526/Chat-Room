import React, { useEffect, useRef } from "react";
import Message from "./Message";

function MessagesList({ messages, currentUsername }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="messages-container" ref={containerRef}>
      {messages.map((message, index) => (
        <Message key={index} data={message} currentUsername={currentUsername} />
      ))}
    </div>
  );
}

export default MessagesList;
