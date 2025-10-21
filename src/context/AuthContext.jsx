import React, { createContext, useState, useContext, useEffect } from 'react';
import { getLocalItem, setLocalItem, removeLocalItem } from '@/services/storageServices.js';

/**
 * Context for user authentication.  Provides a simple mock login
 * mechanism and persists the logged in user to localStorage so the
 * session survives page refreshes.  In a production system you would
 * replace the mock logic with real API calls.
 */

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Initialise user from localStorage if present.  Null means no
  // session.
  const [user, setUser] = useState(() => getLocalItem('user'));

  /**
   * Lista de usuários registrados.  Começa com alguns usuários
   * padrão para demonstração.  Esta lista é carregada do localStorage
   * se existir, para persistir registros entre sessões.  Em um
   * ambiente real, estes dados viriam de um banco de dados.
   */
  const [users, setUsers] = useState(() => {
    const saved = getLocalItem('users');
    if (saved) return saved;
    // Usuários mockados iniciais
    return [
      { email: 'teste@teste.com', password: '123456', name: 'Usuário Teste' },
      { email: 'admin@admin.com', password: 'admin', name: 'Admin' },
    ];
  });

  // Persist user and user list changes to localStorage.  When the
  // user logs out, remove apenas a sessão.  A lista de usuários
  // permanece.
  useEffect(() => {
    if (user) {
      setLocalItem('user', user);
    } else {
      removeLocalItem('user');
    }
    setLocalItem('users', users);
  }, [user, users]);

  const login = (email, password) => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  /**
   * Registra um novo usuário.  Verifica se o email já está em uso
   * antes de adicionar.  Retorna true em caso de sucesso e false
   * quando o email já existe.
   */
  const register = (name, email, password) => {
    const exists = users.some((u) => u.email === email);
    if (exists) return false;
    const newUser = { name, email, password };
    setUsers((prev) => [...prev, newUser]);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
