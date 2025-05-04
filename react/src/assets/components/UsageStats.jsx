import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import UrlClickInfo from "./UrlClickInfo";
import BarChartUrl from "./BarChartUrl.jsx";

function UsageStats() {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [role, setUserRole] = useState(+localStorage.getItem("roleId"));

  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));
  }, [localStorage.getItem("accessToken")]);
  useEffect(() => {
    setUserRole(+localStorage.getItem("roleId"));
    setUsername(localStorage.getItem("username"));
  }, [localStorage.getItem("roleId"), localStorage.getItem("username")]);
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    fetchUrls();
  }, []);
  const fetchUrls = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/urls/`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        console.error("Network response was not ok.");
      }
      const data = await response.json(); //all urls
      if (data) {
        setUrls(data);
        // const clickPromises = data.map(async (url) => {
        //   const clicks = await fetchUrlClicks(url);
         
        // });
        // await Promise.all(clickPromises);

        console.log("Total URLs: ", data.length);
      }
    } catch (error) {
      console.error("Error getting URLs:", error);
    }
  };


  return (
    <>
      <div className="sidebar-child">
        <div className="inner-sidebar-child">
          <h1>Usage Statistics</h1>
          <div className="accordion">
            <Accordion>
            {
              urls.map((url,index)=>{
                return(<>
                 <Accordion.Item key={index} eventKey={url.url_id}>
                 <Accordion.Header><a target="_blank"href={`http://localhost:3000/api/urls/redirect/${url.short_url}`}>cutly/{url.short_url}</a></Accordion.Header>
                 <Accordion.Body>
                  <UrlClickInfo url={url}/>
                </Accordion.Body>
                 </Accordion.Item>
                </>)
              })
            }
              
            </Accordion>
          </div>
          <div className="barchart-url">
          <BarChartUrl/>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default UsageStats;
