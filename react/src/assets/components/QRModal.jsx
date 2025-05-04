import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { QRCode } from "react-qrcode-logo"; //qr code picture
import { BsQrCode } from "react-icons/bs"; //qr code icon
import { IoMdCloudDownload } from "react-icons/io";

function QRModal({ url }) {
  console.log("in qr modal url = ", url);
  const [show, setShow] = useState(false);
  // const [shortenedURL, setShortenedURL] = useState(url);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const downloadCode = (shortenedURL) => {
    console.log("download ", shortenedURL);
    const canvas = document.getElementById(shortenedURL);
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${shortenedURL}.png`;

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      console.log("downloaded");
    }
  };
  return (
    <>
      <button onClick={handleShow} type="button" className="btn qr-button">
        <BsQrCode />
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Scan QR</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="qr-modal">
            <QRCode
              logoImage={url.logo?.logo_path}
              size={250}
              logoHeight={50}
              removeQrCodeBehindLogo={true}
              logoWidth={50}
              logoOpacity={1}
              enableCORS={true}
              id={url.short_url}
              value={`http://localhost:3000/api/urls/redirect/${url.short_url}`}
            />

            <button
              className="btn btn-success download-qr-modal"
              onClick={() => downloadCode(url.short_url)}
            >
              <IoMdCloudDownload />
              Download
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn btn-success"
            onClick={handleClose}
          >
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default QRModal;
