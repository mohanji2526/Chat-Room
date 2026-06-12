import React, { useState, useEffect } from "react";
import { useSocket } from "./hooks/useSocket";
import LoginForm from "./components/LoginForm";
import ChatContainer from "./components/ChatContainer";
import "./styles/App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUsername, setCurrentUsername] = useState("");
  const { socket, isConnected } = useSocket();

  const handleJoinChat = (username) => {
    setCurrentUsername(username);
    setIsLoggedIn(true);
    socket.emit("join", { username });
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        <LoginForm onJoinChat={handleJoinChat} />
      ) : (
        <ChatContainer
          socket={socket}
          isConnected={isConnected}
          currentUsername={currentUsername}
        />
      )}
    </div>
  );
}

export default App;
