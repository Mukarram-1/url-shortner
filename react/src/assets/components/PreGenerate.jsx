import React, { useState, useEffect } from "react";

function PreGenerate() {
  const [qty, setQty] = useState();
  const [pregeneratedUrls,setPregeneratedUrls]=useState([]);
  const username = localStorage.getItem("username");
  const accessToken = localStorage.getItem("accessToken");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/urls/pregenerate?username=${username}&qty=${qty}`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        alert("Error");
      }

      const data = await response.json();
      console.log(data);
      setPregeneratedUrls(data);
    } catch (error) {
      console.error("Error Pre-Generating Short URLS");
    }
  };

  return (
    <>
      <div className="sidebar-child">
        <div className="inner-sidebar-child">
          <div className="pre-generate">
            <div className="new-header">
              <h1>Get Now, Use Later.</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="quantity">
                  Enter Number of Pre-generated URLS:
                </label>
                <input
                  type="number"
                  id="quantity"
                  min="2"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary pre-gen-btn">
                Generate
              </button>
            </form>
            {
            pregeneratedUrls.length > 0 && 
            <div className="pregenerated-urls">
              <h2>Pre-generated URLs:</h2>
              <ul>
                {pregeneratedUrls.map((url, index) => (
                  <li key={index}>{url.short_url}</li>
                 
                ))}
              </ul>
            </div>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default PreGenerate;
