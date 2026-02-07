import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || null
  );

  // Login user and save to localStorage
  const login = (userData, token) => {
    const data = { ...userData, token };
    localStorage.setItem("userInfo", JSON.stringify(data));
    setUser(data);
  };

  // Logout user and clear localStorage
  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
