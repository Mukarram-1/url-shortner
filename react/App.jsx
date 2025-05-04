import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./src/assets/components/Login.jsx";
import Register from "./src/assets/components/Register.jsx";
import Dashboard from "./src/assets/components/Dashboard.jsx";
import Logout from "./src/assets/components/Logout.jsx";
import New from "./src/assets/components/New.jsx";
import SidebarRoot from "./src/assets/components/SidebarRoot.jsx";
import ManageUserRoles from "./src/assets/components/ManageUserRoles.jsx";
import MyUrls from "./src/assets/components/MyUrls.jsx";
import PreGenerate from "./src/assets/components/PreGenerate.jsx";
import UsageStats from "./src/assets/components/UsageStats.jsx";
import UploadLogo from "./src/assets/components/UploadLogo.jsx";
import AssignTag from "./src/assets/components/AssignTag.jsx";
import ApiKeyManagement from "./src/assets/components/ApiKeyManagement.jsx";
import AuditLog from "./src/assets/components/AuditLog.jsx";
AuditLog;
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/logout" element={<Logout />}></Route>
      {/* sidebar layout */}
      <Route path="/home" element={<SidebarRoot />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="new" element={<New />} />
        <Route path="manage" element={<ManageUserRoles />} />
        <Route path="urls" element={<MyUrls />} />
        <Route path="stats" element={<UsageStats />} />
        <Route path="pregenerate" element={<PreGenerate />} />
        <Route path="uploadlogo" element={<UploadLogo />} />
        <Route path="uploadtag" element={<AssignTag />} />
        <Route path="manageapi" element={<ApiKeyManagement />} />
        <Route path="auditlog" element={<AuditLog />} />
      </Route>
    </Routes>
  );
}

export default App;
