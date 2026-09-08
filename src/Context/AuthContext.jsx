import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const data = localStorage.getItem("user");

    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        return null;
      }
    }

    return null;
  });

  function login(email) {
    const userData = {
      email,
    };

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}