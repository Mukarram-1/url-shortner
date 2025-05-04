import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
export default function SidebarRoot() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}
