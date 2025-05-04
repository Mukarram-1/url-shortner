import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaTag } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import MyTags from "./MyTags.jsx"
function AssignTag() {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [show, setShow] = useState(false);
  const [tag_name, setTagName] = useState(""); //url tag name to be updated
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [created, setCreated] = useState(false);
  const [createdMessage, setCreatedMessage] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit");
    // console.log("ACCESS TOKEN = ",accessToken);

    console.log("Tag name ", tag_name);
    try {
      const response = await fetch(`http://localhost:3000/api/urltags`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          tag_name: tag_name,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const tag = await response.json();

      setCreatedMessage("Created Tag Successfully!");
      console.log(" TAG = ", tag);
    } catch (error) {
      setCreatedMessage("Error Creating New Tag");
      console.error("Error creating new tag ", error);
    }
    setCreated(true);
  };
  return (
    <>
      <div className="sidebar-child">
        <div className="inner-sidebar-child">
          <h1>Create New Tag</h1>
          <form onSubmit={handleSubmit} method="post">
            <div id="new-tag-form">
              <input
                className="url-input"
                type="text"
                name="new-tag-input"
                required
                value={tag_name}
                onChange={(e) => {
                  setTagName(e.target.value);
                }}
              />

              <div id="addtagbutton">
                <button className="submit-button" type="submit">
                  Go <FaArrowCircleRight className="arrow-icon" />
                </button>
              </div>
            </div>
          </form>
          {created && (
            <>
              <p
                className={
                  createdMessage === "Error Creating New Tag"
                    ? "error-msg"
                    : "success-msg"
                }
              >
                {createdMessage}
              </p>
            </>
          )}

          <MyTags/>

        </div>
      </div>
    </>
  );
}

export default AssignTag;
