import React, { useState, useEffect } from "react";
import { useSocket } from "./hooks/useSocket";
import LoginForm from "./components/LoginForm";
import ChatContainer from "./components/ChatContainer";
import "./styles/App.css";
import TestApi from "./components/TestApi";
import DevelopSolutionPage from "./components/Profile";
import { HashRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';


const ChatProject = ({ isLoggedIn, handleJoinChat, socket, isConnected, currentUsername }) => {
  return (
    <div>
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
};

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
    
    <Router>
      <Routes>
        {/* Route for the Main Landing Page */}
        <Route path="/" element={<DevelopSolutionPage />} />
        
        {/* Route for the Live Project Component */}
        <Route 
          path="/chat" 
          element={
            <ChatProject 
              isLoggedIn={isLoggedIn}
              handleJoinChat={handleJoinChat}
              socket={socket}
              isConnected={isConnected}
              currentUsername={currentUsername}
            />
          } 
        />
      </Routes>
    </Router>
   
  );
}

export default App;



 