import React, { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";
import Sidebar from "./Sidebar";

function ChatContainer({ socket, isConnected, currentUsername }) {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  
  // State for mobile sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleMessage = (data) => setMessages((prev) => [...prev, data]);
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
    // We restore YOUR "container" class so the glassmorphism works
    <div className="container">
      <div className="chat-area-wrapper">
        
        {/* --- HEADER AREA --- */}
        {/* Wrapped in a relative div so we can place the mobile button over it */}
        <div className="relative">
          <ChatHeader isConnected={isConnected} />
          
          {/* Mobile Toggle Button - Positioned on the right side of the header */}
          <button 
            className="md:hidden absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 hover:bg-white/20 rounded transition"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>
        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="main-content relative">
          
          <div className="chat-area">
            <MessagesList
              messages={messages}
              currentUsername={currentUsername}
            />
            <MessageInput onSendMessage={handleSendMessage} />
          </div>

          {/* Dark Overlay for mobile (clicks close the sidebar) */}
          {isSidebarOpen && (
            <div 
              className="absolute inset-0 bg-black/40 z-20 md:hidden backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* --- SIDEBAR --- 
            Keeps your "sidebar" class. 
            If isSidebarOpen is true, we inject Tailwind classes to override the mobile "display: none"
            using "!flex", and position it over the chat using "absolute right-0".
          */}
          <div 
            className={`sidebar ${
              isSidebarOpen 
                ? "!flex absolute right-0 top-0 bottom-0 z-30 bg-white/95 backdrop-blur-md shadow-2xl border-l border-gray-200" 
                : ""
            }`}
          >
            {/* Mobile Close Button (inside sidebar) */}
            {isSidebarOpen && (
              <button 
                className="md:hidden self-end mb-4 text-gray-500 hover:text-red-500 font-bold flex items-center gap-1"
                onClick={() => setIsSidebarOpen(false)}
              >
                Close
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            
            <Sidebar users={users} userCount={userCount} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default ChatContainer;