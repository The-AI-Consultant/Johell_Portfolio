import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PublicClientApplication, AuthenticationResult, AccountInfo } from '@azure/msal-browser';
import { msalConfig } from '../config/authConfig';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: AccountInfo | null;
  login: () => Promise<void>;
  logout: () => void;
  getAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAdmin: false,
  user: null,
  login: async () => {},
  logout: () => {},
  getAccessToken: async () => null,
});

const msalInstance = new PublicClientApplication(msalConfig);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [user, setUser] = useState<AccountInfo | null>(null);

  useEffect(() => {
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      setIsAuthenticated(true);
      setUser(accounts[0]);
      
      // Check if user is admin - in a real app, this would be determined by roles
      // For now, we'll use a simple domain check for demonstration purposes
      setIsAdmin(accounts[0].username.includes('admin') || accounts[0].username.includes('johellkodac'));
    }
  }, []);

  const login = async (): Promise<void> => {
    try {
      const response: AuthenticationResult = await msalInstance.loginPopup({
        scopes: ['User.Read', 'Files.Read', 'Files.ReadWrite']
      });
      
      if (response.account) {
        setIsAuthenticated(true);
        setUser(response.account);
        
        // Check admin status
        setIsAdmin(response.account.username.includes('admin') || response.account.username.includes('johellkodac'));
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = (): void => {
    msalInstance.logout();
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUser(null);
  };

  const getAccessToken = async (): Promise<string | null> => {
    try {
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length === 0) return null;
      
      const tokenResponse = await msalInstance.acquireTokenSilent({
        scopes: ['User.Read', 'Files.Read', 'Files.ReadWrite'],
        account: accounts[0]
      });
      
      return tokenResponse.accessToken;
    } catch (error) {
      console.error('Failed to acquire token silently:', error);
      
      try {
        const tokenResponse = await msalInstance.acquireTokenPopup({
          scopes: ['User.Read', 'Files.Read', 'Files.ReadWrite']
        });
        return tokenResponse.accessToken;
      } catch (err) {
        console.error('Failed to acquire token popup:', err);
        return null;
      }
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, user, login, logout, getAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);