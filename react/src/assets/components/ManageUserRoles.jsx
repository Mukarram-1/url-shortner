import React from "react";
import UserTable from "./UserTable";

function ManageUserRoles() {
  return (
    <>
      <div className="sidebar-child">
        <div className="users inner-sidebar-child">
          <h2>Users</h2>

          <UserTable />
        </div>
      </div>
    </>
  );
}

export default ManageUserRoles;
