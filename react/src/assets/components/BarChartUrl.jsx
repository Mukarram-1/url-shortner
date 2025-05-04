import React, { useState, useEffect } from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

export default function BarChartUrl() {
  const [urls, setUrls] = useState([]);
  const [data, setData] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/urls`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        console.error("Network response was not ok.");
        return;
      }
      const urlsData = await response.json();
      setUrls(urlsData);

      // Fetch click counts for all URLs
      const clicksData = await Promise.all(
        urlsData.map(async (url) => {
          const clicks = await fetchUrlClicks(url.url_id);
          return { url: url.short_url, clicks };
        })
      );

      setData(clicksData);
    } catch (error) {
      console.error("Error getting URLs:", error);
    }
  };

  const fetchUrlClicks = async (url_id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/urlclicks?url_id=${url_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        console.error("Network response was not ok.");
        return 0;
      }
      const data = await response.json();
      return parseInt(data.count);
    } catch (error) {
      console.error("Error getting click counts:", error);
      return 0;
    }
  };

  return (
    <div>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 80,
          bottom: 5,
        }}
        barSize={20}
      >
        <XAxis
          dataKey="url"
          scale="point"
          padding={{ left: 10, right: 10 }}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="clicks" fill="#8884d8" background={{ fill: "#eee" }} />
      </BarChart>
    </div>
  );
}
