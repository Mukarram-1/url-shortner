import React, { useEffect, useState } from "react";
import UpdateUserModal from "./UpdateUserModal";
import { MdDelete } from "react-icons/md";

import CreateUserModal from "./CreateUserModal";
function UserTable() {
  const [users, setUsers] = useState([]);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));
  }, [localStorage.getItem("accessToken")]);
  const fetchUsers = () => {
    let API_URL="http://localhost:3000/api/users/"
    fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setUsers(data);
        }
      })
      .catch((error) => {
        console.error("Error Fetching User:", error);
      });
  };
  function handleUserDeleteButton(username) {
    fetch(`http://localhost:3000/api/users?username=${username}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchUsers();
      });
  }
  async function handleUserRoleUpdate(username, old_role_id,new_role_id) {
    console.log(username,old_role_id,new_role_id);
    try {
      const response = await fetch('http://localhost:3000/api/users/updateRole',{
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${accessToken}`,
        },
        body: JSON.stringify({
              username:username,
              old_role_id:+old_role_id,
              new_role_id:+new_role_id,
            }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      fetchUsers();

    } catch (error) {
      console.log(error);
      
    }
  }
  const handleUserAddButton = async ({ username, email, password }) => {
    console.log(username, email, password);
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          role_id: 2,
          password_hash: password,
        }),
      });

      if (!response.ok) {
        alert("Please Enter Valid Credentials");
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      fetchUsers();
    } catch (error) {
      console.error("Error Signing in New User: ", error);
    }
  };
  return (
    <>
      <div className="add-user-button">
                <CreateUserModal handleUserAddButton={handleUserAddButton} />
              </div>

      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role_id === 1 ? "Admin" : "User"}</td>
                <td className="actions-td">
                  <button
                    className="row-delete-button btn btn-danger"
                    onClick={() => handleUserDeleteButton(user.username)}
                  >
                    <MdDelete />
                  </button>
                  <div className="text-center">
                    <UpdateUserModal
                      username={user.username}
                      handleUserRoleUpdate={handleUserRoleUpdate}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserTable;
