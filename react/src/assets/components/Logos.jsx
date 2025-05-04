import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { MdDelete } from "react-icons/md";
function Logos() {
  const [logos, setLogos] = useState([]);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [show, setShow] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/logos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      setLogos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShow = (logo) => {
    setSelectedLogo(logo);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedLogo(null);
  };
const handleLogoDeleteButton=async(logo)=>{
  try {
    const response = await fetch("http://localhost:3000/api/logos/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ secure_url: logo.logo_path })
    });
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();

    setShow(false);
    fetchLogos();
  } catch (error) {
    console.log(error);
  }

}
  return (
    <>
      <div className="logos-container">
        {logos.map((logo, index) => (
          <div key={index} className="logo-card">
            <img
              onClick={() => handleShow(logo)}
              className="logo-image"
              src={logo.logo_path}
              alt={`logo-${index}`}
            />
          </div>
        ))}
      </div>

      {selectedLogo && (
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="logo-modal">
              <img
                className="logo-image-modal"
                src={selectedLogo.logo_path}
                alt="Selected Logo"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>

          <button
            className="row-delete-button btn btn-danger"
            onClick={() => handleLogoDeleteButton(selectedLogo)}
          >
            <MdDelete />
          </button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default Logos;
