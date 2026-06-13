import React from "react";
import UserList from "./UserList";

function Sidebar({ users, userCount }) {
  return (
    // We add h-full and w-full so this wrapper doesn't shrink,
    // allowing the UserList inside it to flex properly.
    <div className="h-full w-full">
      <UserList users={users} userCount={userCount} />
    </div>
  );
}

export default Sidebar;