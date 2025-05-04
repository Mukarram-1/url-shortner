import React, { useState,useEffect } from 'react'

function AuditLog() {
    const [audits,setAudits]=useState([]);
    useEffect(() => {
        fetchAudits();
      }, []);
    const [accessToken, setAccessToken] = useState(
        localStorage.getItem("accessToken")
      );
    useEffect(() => {
        setAccessToken(localStorage.getItem("accessToken"));
      }, [localStorage.getItem("accessToken")]);

      const fetchAudits = async () => {
        try {
          const response  = await fetch(`http://localhost:3000/api/auditlogs`, {
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
             
              setAudits(data);
            }
          console.log("audits: ",data);
        } catch (error) {
          console.error("ERROR GETTING AUDITS");
        }
        
      };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(date);
      };
  return (
    <> <div className="sidebar-child">
      <div className="inner-sidebar-child">
        <h1>Audit Log of Urls</h1>
       {audits&& (<div>
        <table className="table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>User</th>
              <th>Action</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {audits?.map((audit, index) => (
              <tr key={index}>
                <td>{formatDate(audit.change_date)}</td>
                <td>{audit.users.username}</td>
                <td>{audit.action}</td>
                <td>{audit.details}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>)}




        </div>
        </div>
        </>
  );
}

export default AuditLog