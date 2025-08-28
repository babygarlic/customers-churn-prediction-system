import React, { createContext, useContext, useState, ReactNode, useEffect} from 'react';
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
    // Initialize from localStorage
    const savedUser = { access_token:localStorage.getItem('token'),
                        token_type: localStorage.getItem('token_type'),
                        username: localStorage.getItem('username'),

    };
    if (!savedUser.access_token && !savedUser.token_type && !savedUser.username) {
      return null;
    }
    return savedUser as User;
  });
  const [isLoading, setIsLoading] = useState(false);

  // Save user to localStorage whenever user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('acess_token', JSON.stringify(user));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('token_type');
    }
  }, [user]);
  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
     try {
    // Sử dụng URLSearchParams
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params
    });

    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('token_type', data.token_type);
      setUser({token_type: data.token_type, access_token: data.access_token , username: data.username });
      setIsLoading(false);
      return true;
    }

  } catch (error) {
    console.error('Error:', error);
   
  }
   setIsLoading(false);
    return false;
  
  };

  const register = async (email: string, password: string, username: string): Promise<boolean> => {
    setIsLoading(true);
     try {
        const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username,email, password })

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
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};