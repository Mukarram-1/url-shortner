import React,{useEffect,useState} from 'react'
import { FaArrowCircleRight } from "react-icons/fa";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { IoCopyOutline } from "react-icons/io5";

function ApiKeyManagement() {
    const [accessToken, setAccessToken] = useState(
        localStorage.getItem("accessToken")
      );
      const [apiKey,setApiKey]=useState("");

      const handleGenerateApiClick=async()=>{
try {
    const response=await fetch('http://localhost:3000/api/apikeys',{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${accessToken}`
        }
    });
    if(!response.ok){
        throw new Error("network response was not ok");
    }

    const data=await response.json();
    if(data){
        setApiKey(data.api_key)
    }
        
} catch (error) {
    console.error('Error Creating new api key');
}
      }
  return (
    <>
    <div className="sidebar-child">
      <div className="inner-sidebar-child">
        <h1>Manage API Keys</h1>
        <div id="createapikey">
            <button className="submit-button" onClick={handleGenerateApiClick}>
                Generate API Key <FaArrowCircleRight className="arrow-icon" />
            </button>
        </div>

        {/*  */}
        <section className={apiKey?"api-key-box":"inactive-short-url"}>
          <h5>Your API Key</h5>
          {apiKey && <div>
            <span>{apiKey}</span>
            
            <CopyToClipboard text={apiKey}>
          <button><IoCopyOutline /></button>
         </CopyToClipboard>
          </div>
          
          }
          
        </section>



     </div>
     </div>
    </>
  )
}

export default ApiKeyManagement