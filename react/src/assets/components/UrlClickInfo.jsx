import React, { useEffect, useState } from "react";

function UrlClickInfo({ url }) {

const [urlclicks,setUrlClicks]=useState([]);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));
  }, [localStorage.getItem("accessToken")]);
useEffect(()=>{
fetchUrlClicks(url);
},[]);

  const fetchUrlClicks = async (url) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/urlclicks?url_id=${url.url_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        console.error("Network response was not ok.");
      }
      const data = await response.json(); //url clicks array []
    // setUrlClicks([...urlclicks,data]);
    setUrlClicks([...data.urlclicks]);
    console.log("URLclicks array of ",url.url_id ," = ",data);
     
    } catch (error) {
      console.error("Error getting url clicks:", error);
      return 0;
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }
  
  // Function to format time to HH:MM AM/PM
  function formatTime(timeString) {
    const date = new Date(timeString);
    let hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    const formattedHours = String(hours).padStart(2, '0');
  
    return `${formattedHours}:${minutes} ${ampm}`;
  }

  return <>
          <div className="urlClick-table">
               <table >
                  <thead>
                    <tr>
                      <th>Access Date</th>
                      <th>Access Time</th>
                      <th>IP Address</th>
                      <th>User Agent</th>
                      <th>Referer</th>
                    </tr>
                  </thead>
                    <tbody>
                      {urlclicks.map((urlclick, index) => (
                        <tr key={index}>
                          <td>{formatDate(urlclick.access_date)}</td>
                          <td>{formatTime(urlclick.access_time)}</td>
                          <td>{urlclick.ip_address}</td>
                          <td>{urlclick.user_agent}</td>
                          <td>{urlclick.referrer}</td>
                          
                        </tr>
                      ))}
                    </tbody>
              </table>
          </div> 
  </>;
}

export default UrlClickInfo;
