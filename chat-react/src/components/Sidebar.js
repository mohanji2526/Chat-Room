import React from "react";
import UserList from "./UserList";

function Sidebar({ users, userCount }) {
  return <UserList users={users} userCount={userCount} />;
}

export default Sidebar;
