import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add"; // +
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewListIcon from "@mui/icons-material/ViewList";
import QrCodeIcon from "@mui/icons-material/QrCode";
import InsightsIcon from "@mui/icons-material/Insights"; //stats
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; //logout
import PersonIcon from "@mui/icons-material/Person"; //manage users
import { FaKey } from "react-icons/fa"; //api key
import { IoLogoIonitron } from "react-icons/io"; //LOGO
import { FaTag } from "react-icons/fa"; //tag
import { AiOutlineAudit } from "react-icons/ai"; //auditlog

export default function Sidebar() {
  const [role, setUserRole] = useState(undefined);
  useEffect(() => {
    setUserRole(+localStorage.getItem("roleId"));
  }, [localStorage.getItem("roleId")]);
  return (
    <div className="sidebar">
      <h1 className="sidebar-h1">Cutly</h1>

      {role && (
        <>
          {/* create new url */}
          <div id="add-icon" className="sidebar-item">
            <Link className="sidebar-itemname" to="/home/new">
              <AddIcon />
              <span className="hover-underline-animation">NEW</span>
            </Link>
          </div>
          <hr />
          {/* dashboard */}
          <div className="sidebar-item">
            <Link className="sidebar-itemname" to="/home/dashboard">
              <DashboardIcon />
              <span className="hover-underline-animation">Dashboard</span>
            </Link>
          </div>
          {/* list of urls */}
          <div className="sidebar-item">
            <Link className="sidebar-itemname" to="/home/urls">
              <ViewListIcon />
              <span className="hover-underline-animation">My URLs</span>
            </Link>
          </div>

          {/* usage stats of urls */}
          <div className="sidebar-item">
            <Link className="sidebar-itemname" to="/home/stats">
              <InsightsIcon />
              <span className="hover-underline-animation">Statistics</span>
            </Link>
          </div>
          {/* add logo */}
          <div className="sidebar-item">
            <Link className="sidebar-itemname" to="/home/uploadlogo">
              <IoLogoIonitron />
              <span className="hover-underline-animation">Add Logo</span>
            </Link>
          </div>

          {/* create tag */}
          <div className="sidebar-item">
            <Link className="sidebar-itemname" to="/home/uploadtag">
              <FaTag />
              <span className="hover-underline-animation">Add Tag</span>
            </Link>
          </div>
          {/* api keys of user */}
          <div className="sidebar-item">
            <Link className="sidebar-itemname" to="/home/manageapi">
              <FaKey />
              <span className="hover-underline-animation">Manage API</span>
            </Link>
          </div>
        </>
      )}

      {/* userrole: admin */}
      {role === 1 && (
        <>
          {/* pregenerate*/}
          <div className="sidebar-item">
            <Link className="sidebar-itemname" to="/home/pregenerate">
              <PersonIcon />
              <span className="hover-underline-animation">Pre-Generate</span>
            </Link>
          </div>
          {/* manage users */}
          <div className="sidebar-item">
            <Link className="sidebar-itemname" to="/home/manage">
              <PersonIcon />
              <span className="hover-underline-animation">Manage Role</span>
            </Link>
          </div>


          {/* audit log*/}
          <div className="sidebar-item">
            <Link className="sidebar-itemname" to="/home/auditlog">
            <AiOutlineAudit />
              <span className="hover-underline-animation">Audit Logs</span>
            </Link>
          </div>


        </>
      )}
      {/* logout */}
      {role && (
        <>
          <div
            className="sidebar-item"
            style={{ width: "90%", bottom: "0", position: "absolute" }}
          >
            <Link className="sidebar-itemname" to="/logout">
              <ExitToAppIcon />
              <span className="hover-underline-animation">Log out</span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
