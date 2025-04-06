import React from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
function Logout() {
  const { logoutUser } = useAuth();
  useEffect(() => {
    logoutUser();
  }, [logoutUser]);
  //return to login page:
  return <Navigate to="/" />;
}

export default Logout;
