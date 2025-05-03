
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  username: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  currentUser: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  getAccessToken: () => string | null;
}

const users = {
  admin: { username: 'admin', password: 'admin2024', role: 'admin' as const },
  johell: { username: 'johell', password: 'photo2024', role: 'admin' as const }
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAdmin: false,
  currentUser: null,
  login: async () => false,
  logout: () => {},
  getAccessToken: () => null
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = async (username: string, password: string): Promise<boolean> => {
    const user = users[username as keyof typeof users];
    
    if (user && user.password === password) {
      setIsAuthenticated(true);
      setIsAdmin(user.role === 'admin');
      setCurrentUser({ username: user.username, role: user.role });
      setAccessToken(`token_${Date.now()}`);
      return true;
    }
    return false;
  };

  const logout = (): void => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setCurrentUser(null);
    setAccessToken(null);
  };

  const getAccessToken = (): string | null => {
    return accessToken;
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isAdmin, 
      currentUser, 
      login, 
      logout,
      getAccessToken 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
