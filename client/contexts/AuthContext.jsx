import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext(undefined);

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

const getRolesFromToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.roles || [];
  } catch {
    return [];
  }
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken && !isTokenExpired(storedToken);
  });
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(() => {
    const storedToken = localStorage.getItem("token");
    const roles = getRolesFromToken(storedToken);
    return roles.includes("admin");
  });

  useEffect(() => {
    const validateToken = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken && !isTokenExpired(storedToken)) {
        try {
          axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;

          setToken(storedToken);
          setIsLoggedIn(true);
          const roles = getRolesFromToken(storedToken);
          setIsAdmin(roles.includes("admin"));
        } catch (error) {
          console.error("Token validation failed:", error);
          logout();
        }
      } else if (storedToken) {
        console.log("Token expired");
        logout();
      }
    };

    validateToken();

    const intervalId = setInterval(validateToken, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const login = async (newToken) => {
    if (newToken && !isTokenExpired(newToken)) {
      localStorage.setItem("token", newToken);
      setToken(newToken);
      setIsLoggedIn(true);
      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      const roles = getRolesFromToken(newToken);
      setIsAdmin(roles.includes("admin"));
    } else {
      throw new Error("Invalid or expired token provided");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};