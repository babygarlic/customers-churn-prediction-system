import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);


  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('username', email); 
      params.append('password', password);

      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params,
      });

      const data = await response.json();

      if (response.ok) {
        const newUser: User = {
          token_type: data.token_type,
          access_token: data.access_token,
          username: data.username,
        };
        setUser(newUser);
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      console.error('Login error:', error);
    }
    setIsLoading(false);
    return false;
  };

  const register = async (email: string, password: string, username: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        setIsLoading(false);
        return true; 
      } else {
        const data = await response.json();
        throw new Error(data.detail || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
