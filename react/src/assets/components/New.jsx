import React, { useEffect, useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { QRCode } from 'react-qrcode-logo';
import { IoMdCloudDownload } from "react-icons/io";
import { Padding } from "@mui/icons-material";
// NEW URL
function New() {
 
  const today = new Date().toISOString().split('T')[0];
  const username =localStorage.getItem("username");
  const accessToken = localStorage.getItem("accessToken");
  const [tags,setTags]=useState([]);//array of tags
  
  const [tagId,setTagId]=useState(""); 
  const [urlInput, setUrlInput] = useState("");
  const [type,setType]=useState(undefined);
  const [expirationDate, setExpirationDate] = useState(undefined);
  const [isPreGenerated,setIsPrGenerated]= useState(false);
  const [shortenedUrl,setShortenedUrl]=useState("");
  useEffect(() => {
    fetchTags();
  }, [])
  
  const downloadCode = (shortenedUrl) => {
    const canvas = document.getElementById(shortenedUrl);
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
  
      // Suggest saving in the 'images' folder inside the 'public' directory
      downloadLink.download = `${shortenedUrl}.png`;
      
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // shorten the URL
    console.log("handleSubmit");
    let bodyObject = {
      original_url: urlInput,
  };
  
  if (type) {
      bodyObject['url_type'] = type;
  }
  if (expirationDate) {
      bodyObject['expiration_date'] = new Date(expirationDate);
  }
  if (isPreGenerated) {
      bodyObject['is_pre_generated'] = isPreGenerated;
  }
  if(tagId){
    bodyObject['tag_id'] = +tagId;
  }
 try {
      const response = await fetch(`http://localhost:3000/api/urls?username=${username}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...bodyObject})
      });
      if(!response.ok){
        alert("Error");
      }
  
      const data = await response.json();
      console.log(data);
      setShortenedUrl(data.short_url);
    } catch (error) {
     console.error("Error Creating new Short URL");
    }
  
  };


  const fetchTags = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/urltags`, {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const tags = await response.json();
      setTags(tags);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  return (
    <div className="sidebar-child">
      <div className="inner-sidebar-child">
     
        <div className="new-header">
          <h1>New Short URL</h1>
        </div>
        <section id="url-box">
          <h2>Shorten a long link</h2>

          <form onSubmit={handleSubmit} method="post">
            <div id="form-url">
              <input
                className="url-input"
                type="url"
                name="url-input"
                placeholder="https://www.super-long-link.com/shorten-it"
                required
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                }}
              />
              <label htmlFor="url-type-input">Type</label>
                <select
                  name="url-type-input"
                  id="url-type-input"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"        
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                >
                <option disabled value=""></option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="misc">Misc</option>
                </select>
                {/* tag  */}
                <label htmlFor="url-tag-input">Tag</label>
                <select
                name="url-tag-input"
                id="url-tag-input"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                value={tagId}
                onChange={(e) => {
                  setTagId(e.target.value);
                }}
              >
                <option disabled value=""></option>
                {tags.map((tag) => (
                  <option key={tag.tag_id} value={tag.tag_id}>
                    {tag.tag_name}
                  </option>
                ))}
              </select>
              <label htmlFor="expiration-date">Expiration Date:</label>
                <input
                 className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="date"
                    id="expiration-date"
                    min={today}
                    value={expirationDate}
                    onChange={(e) => {
                      setExpirationDate(e.target.value);
                    }}
                />
                <label htmlFor="is-pre-generated">Pre Generated</label>
                <input
                    type="checkbox"
                    name="is-pre-generated"
                    id="is-pre-generated"
                    value={isPreGenerated}
                    onChange={() => setIsPrGenerated(!isPreGenerated)}
                  />
              <div id="formbutton">
                <button className="submit-button" type="submit">
                  Get your link <FaArrowCircleRight className="arrow-icon" />
                </button>
              </div>
              
            </div>
          </form>
        </section>
        <section className={shortenedUrl?"short-url-box":"inactive-short-url"}>
          <h5>Your Shortened URL</h5>
          {shortenedUrl && <div className="new-url-div">
            <a className="short-url" href={`http://localhost:3000/api/urls/redirect/${shortenedUrl}`} target="_blank">http://localhost:3000/api/urls/redirect/{shortenedUrl}</a>
            {/* <div className="new-short-url-qr"> 
              <QRCode size={100} enableCORS={true}  id={shortenedUrl} value={`http://localhost:3000/api/urls/redirect/${shortenedUrl}`}
                />
               <button
              className="btn btn-success download-qr-modal"
              onClick={() => downloadCode(shortenedUrl)}
            >
              <IoMdCloudDownload />
              
              Download
            </button>
            </div> */}
           
          </div>
          }
          
        </section>
        </div>
    </div>
  );
}

export default New;
