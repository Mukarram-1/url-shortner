import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEdit } from "react-icons/fa";
function UpdateUserModal({ username: prevUsername, handleUserRoleUpdate }) {
  const [prevData, setPrevData] = useState({});
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [role, setRole] = useState();
  const [prevRole, setPrevRole] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  useEffect(() => {
    if (show) {
      fetch(
        `http://localhost:3000/api/users/getByUsername?username=${prevUsername}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setRole(data.role_id);
          setPrevRole(data.role_id);
          setUsername(data.username);
          setEmail(data.email);
          setPrevData({
            username: data.username,
            email: data.email,
            role: data.role_id,
          });
          console.log("prev data is ", data);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, [show]);

  return (
    <>
      <button
        onClick={handleShow}
        type="button"
        className="btn btn-primary row-update-button"
      >
        <FaEdit />
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Manage {prevUsername}'s Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              handleClose();
              e.preventDefault();
              handleUserRoleUpdate(prevUsername, prevRole, role);
            }}
            id="modal-form2"
            className="w-full max-w-sm"
          >
            {/* username */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="username-input2"
                >
                  <strong> Username:</strong>
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="username-input2"
                  name="username-input2"
                  type="text"
                  required
                  value={username}
                  // onChange={(e) => {
                  //   setUsername(e.target.value);
                  // }}
                />
              </div>
            </div>

            {/* email */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="email-input2"
                >
                  <strong>Email:</strong>
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="email"
                  id="email-input2"
                  name="email-input2"
                  required
                  value={email}
                  // onChange={(e) => {
                  //   setEmail(e.target.value);
                  // }}
                />
              </div>
            </div>

            {/* role */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="role-input2"
                >
                  <strong>Role:</strong>
                </label>
              </div>
              <div className="md:w-2/3">
                <select
                  name="role-input2"
                  id="role-input2"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  required
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                >
                  <option value="1">Admin</option>
                  <option value="2">User</option>
                </select>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button
            className="btn btn-primary row-update-button"
            form="modal-form2"
          >
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateUserModal;
