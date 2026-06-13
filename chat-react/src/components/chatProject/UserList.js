import React from "react";

function UserList({ users, userCount }) {
  return (
    // Replaced className="sidebar" with a full-height flex container 
    // because ChatContainer is already applying the .sidebar styling.
    <div className="flex flex-col h-full w-full">
      
      {/* Top Section: User Count */}
      <div className="sidebar-section shrink-0">
        <div className="user-count">
          <strong>{userCount}</strong> online
        </div>
      </div>

      {/* Bottom Section: Scrollable User List */}
      <div className="sidebar-section flex-1 overflow-hidden flex flex-col mb-0">
        <div className="sidebar-title">👥 Users</div>
        
        {/* overflow-y-auto ensures only the list scrolls, not the whole sidebar */}
        <ul className="user-list overflow-y-auto pr-2">
          {users.map((user) => (
            <li 
              key={user.id || user.username} 
              // Added Tailwind's 'truncate' so extra-long usernames turn into "SuperAwesome..." 
              // instead of breaking your layout on small mobile screens.
              className="user-item truncate" 
              title={user.username} // Shows the full name when hovered
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default UserList;