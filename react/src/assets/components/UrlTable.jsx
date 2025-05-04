import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import UpdateUrlModal from "./UpdateUrlModal";
import QRModal from "./QRModal";
import {Toaster,toast} from 'sonner'
function UrlTable() {
  const [urls, setUrls] = useState([]);
  const username = localStorage.getItem("username");
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  useEffect(() => {
    fetchUrls();
  }, []);
  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));
  }, [localStorage.getItem("accessToken")]);
  const fetchUrls = async () => {
    try {
      const response  = await fetch(`http://localhost:3000/api/urls`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
      })
      if(!response.ok){
        console.error("NETWORK RESPONSE WAS NOT OK.");
      }
        const data = await response.json();
        if(data){
         
          setUrls(data);
        }
      console.log("URLS: ",data);
    } catch (error) {
      console.error("ERROR GETTING URLS");
    }
    
  };
  async function handleUrlDeleteButton(id) {
    console.log(id);
    try{
      const response=await fetch(`http://localhost:3000/api/urls/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    })
    if(!response.ok){
      console.error("NETWORK RESPONSE WAS NOT OK.");
    }
      const data = await response.json();
      fetchUrls();
  } catch (error) {
    console.error("ERROR DELETING URL");
  }
  }
   async function handleUrlUpdateButton(url_id, updatedURL) {
    console.log("TAG ID = ",updatedURL.tag_id);
     try{
      console.log(url_id,updatedURL);
      const response=await fetch(`http://localhost:3000/api/urls/${url_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body:JSON.stringify(updatedURL),
    })
    if(!response.ok){
      console.error("NETWORK RESPONSE WAS NOT OK.");
    }
      const url = await response.json();
      console.log("UPDATED URL = ",url);
      
      fetchUrls();
  } catch (error) {
    console.error("ERROR UPDATING URL");
  }
  }

  return (
    <>
      <div>
        <table className="table">
          <thead>
            <tr>
             
              <th>Original</th>
              <th>Short</th>
              {/* <th>Expires On</th> */}
              <th>Status</th>
              <th>Type</th>
              {/* <th>Pre Generated</th> */}
              {/* <th>QR</th> */}
              <th>Tag</th>
              <th>Actions</th>
              

            </tr>
          </thead>
          <tbody>
            {urls?.map((url, index) => (
               
              <tr key={index}>
                <td><a target="_blank" href={url.original_url?url.original_url:""}>{url.original_url?url.original_url:"-"}</a></td>
                <td><a href={`http://localhost:3000/api/urls/redirect/${url.short_url}`} target="_blank">{`cutly/${url.short_url}`}</a></td>
               {/* <td>{url.expiration_date?url.expiration_date:"-"}</td> */}
               <td>{url.status}</td>
                <td>{url.url_type?url.url_type:"-"}</td>
                {/* <td>{url.is_pre_generated?"true":"false"}</td> */}
                {/* <td><QRModal url={url.short_url}/></td> */}
                <td><div className={url.urltag?"tag":""}><span>{url.urltag?url.urltag.tag_name:"-"}</span></div></td>
               
                <td className="actions-td">
                  <button
                    className="row-delete-button btn btn-danger"
                    onClick={() =>{ handleUrlDeleteButton(url.url_id)
                      toast.success('Deleted Url Successfully')
                    }}
                  >
                    <Toaster richColors/>
                    <MdDelete />
                  </button>
                  <div className="text-center">
                    <UpdateUrlModal
                      id={url.url_id}
                      handleUrlUpdateButton={handleUrlUpdateButton}
                    />
                  </div>
                  <div className="qr-action"> <QRModal className="qr" url={url}/></div>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UrlTable;
