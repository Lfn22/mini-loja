import React, { createContext, useContext, useEffect, useState } from "react";
import { getItem, setItem, removeItem } from "../services/storageServices.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getItem("currentUser", null));

  useEffect(() => {
    if (user) setItem("currentUser", user);
    else removeItem("currentUser");
  }, [user]);

  function register({ username, password, name, email }) {
    const users = getItem("users", []);
    if (users.find((u) => u.username === username)) {
      throw new Error("Usuário já existe");
    }
    const newUser = { username, password, name, email };
    users.push(newUser);
    setItem("users", users);
    setUser({ username, name, email });
    return newUser;
  }

  function login({ username, password }) {
    const users = getItem("users", []);
    const u = users.find((x) => x.username === username && x.password === password);
    if (!u) throw new Error("Credenciais inválidas");
    setUser({ username: u.username, name: u.name, email: u.email });
    return u;
  }

  function logout() {
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, register, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
