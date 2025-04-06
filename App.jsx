import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./src/assets/components/Login.jsx";
import Register from "./src/assets/components/Register.jsx";
import Logout from "./src/assets/components/Logout.jsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/logout" element={<Logout />}></Route>
    </Routes>
  );
}

export default App;
