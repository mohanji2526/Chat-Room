import React, { useState } from "react";

function LoginForm({ onJoinChat }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      alert("Please enter a username");
      return;
    }
    onJoinChat(username.trim());
  };

  return (
    <div className="container">
      <div className="login-area">
        <div className="login-form">
          <h2>💬</h2>
          <h2>Chat Room</h2>
          <p>Join the conversation</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              maxLength="20"
              autoFocus
            />
            <button type="submit">
              <i className="fas fa-arrow-right"></i> Join Chat
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
