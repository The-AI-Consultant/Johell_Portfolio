
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  username: string;
  role: 'admin' | 'dev';
}

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  currentUser: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const users = {
  admin: { username: 'admin', password: 'admin2024', role: 'admin' as const },
  dev: { username: 'dev', password: 'dev2024', role: 'dev' as const }
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAdmin: false,
  currentUser: null,
  login: () => false,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = (username: string, password: string): boolean => {
    const user = users[username as keyof typeof users];
    
    if (user && user.password === password) {
      setIsAuthenticated(true);
      setIsAdmin(user.role === 'admin');
      setCurrentUser({ username: user.username, role: user.role });
      return true;
    }
    return false;
  };

  const logout = (): void => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
