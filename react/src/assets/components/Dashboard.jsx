import React, { useState, useEffect } from "react";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import AnalyticsCard from "./AnalyticsCard";
import { useAuth } from "../../store/auth";

function Dashboard() {
  const { isLoggedIn } = useAuth();
  const [urls, setUrls] = useState([]); // All URLs of the user
  const [role, setUserRole] = useState(+localStorage.getItem("roleId"));
  const [Totalclicks, setTotalClicks] = useState(0); // Sum of all URL clicks
  const [urlAndClick, setUrlAndClick] = useState([]); // Array to store URLs and their click counts
  const [username, setUsername] = useState(localStorage.getItem("username"));
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

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      setTotalClicks(0);
      setUrlAndClick([]);
      const response = await fetch(
        `http://localhost:3000/api/urls`,
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
      const data = await response.json();
      if (data) {
        setUrls(data);

        let totalClicks = 0; 

        const clickPromises = data.map(async (url) => {
          const clicks = await fetchUrlClicks(url);
          totalClicks += clicks;
        });

        await Promise.all(clickPromises);

        setTotalClicks(totalClicks);

        console.log("Total URLs: ", data.length);
      }
    } catch (error) {
      console.error("Error getting URLs:", error);
    }
  };

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
      const data = await response.json();
      const clicks = parseInt(data.count);

      setUrlAndClick((prevUrlAndClick) => {
        if (!prevUrlAndClick.some((item) => item.url === url.short_url)) {
          return [...prevUrlAndClick, { url: url.short_url, clicks: clicks }];
        } else {
          return prevUrlAndClick;
        }
      });

      // console.log(`URL clicks ${url.short_url}: `, clicks);
      return clicks; 
    } catch (error) {
      console.error("Error getting click counts:", error);
      return 0; 
    }
  };

  return (
    <>
      {isLoggedIn && (<>
        <div className="dashboard">
          <div className="dashboard-content">
            <h1 className="roboto-light">Hello, {username}!</h1>
            <h2 className="welcome">Welcome to Dashboard.</h2>
            <div className="cards">
              <AnalyticsCard
                icon={<AdsClickIcon style={{ fontSize: "50px" }} />}
                heading="Link Clicks"
                number={Totalclicks}
              />
              <AnalyticsCard
                icon={<QrCodeScannerIcon style={{ fontSize: "50px" }} />}
                heading="QR Code Scans"
                number={100}
              />
            </div>
          </div>

        </div>
        <div className="dashboard-table">
               <table >
                  <thead>
                    <tr>
                      <th>SHORT URL</th>
                      <th>CLICKS</th>
                    </tr>
                  </thead>
                    <tbody>
                      {urlAndClick.map((urlnclick, index) => (
                        <tr key={index}>
                          <td>{urlnclick.url}</td>
                          <td>{urlnclick.clicks}</td>
                        </tr>
                      ))}
                    </tbody>
              </table>
          </div>                
                </>
      )}
    </>
  );
}

export default Dashboard;
