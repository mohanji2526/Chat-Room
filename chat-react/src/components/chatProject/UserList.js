import React from "react";

function UserList({ users, userCount }) {
  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <div className="user-count">
          <strong>{userCount}</strong> online
        </div>
      </div>
      <div className="sidebar-section">
        <div className="sidebar-title">👥 Users</div>
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id || user.username} className="user-item">
              {user.username}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserList;
