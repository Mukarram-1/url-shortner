import { createContext, useContext, useState, useEffect } from "react";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [roleId, setRoleId] = useState(localStorage.getItem("roleId"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const storeUsernameInLS = (user) => {
    setUsername(user);
    return localStorage.setItem("username", user);
  };
  const storeTokenInLS = (accessToken) => {
    setAccessToken(accessToken);
    return localStorage.setItem("accessToken", accessToken);
  };
  const storeRoleIdInLS = (roleId) => {
    setRoleId(roleId);
    return localStorage.setItem("roleId", roleId);
  };
  const isLoggedIn = !!accessToken;
  const role_id = roleId;

  const logoutUser = () => {
    setAccessToken("");
    setRoleId("");
    setUsername("");
    localStorage.removeItem("roleId");
    localStorage.removeItem("username");
    return localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider
      value={{
        storeTokenInLS,
        storeRoleIdInLS,
        storeUsernameInLS,
        logoutUser,
        isLoggedIn,
        role_id,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
// //consumer:
export const useAuth = () => {
  const contextValue = useContext(AuthContext);
  return contextValue;
};
