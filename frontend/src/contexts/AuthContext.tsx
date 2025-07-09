import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (identifier: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string) => Promise<string | null>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
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

const API_BASE = '/api/auth';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  });

  // Check for existing session on mount (optional: use localStorage for token persistence)
  useEffect(() => {
    const token = localStorage.getItem('neighborfit_token');
    const username = localStorage.getItem('neighborfit_username');
    if (token && username) {
      setAuthState({
        user: { id: '', email: '', name: username, createdAt: '', token },
        isAuthenticated: true,
        isLoading: false,
      });
    }
  }, []);

  const login = async (identifier: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });
      if (!res.ok) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return false;
      }
      const data = await res.json();
      // Store token and username for session persistence
      localStorage.setItem('neighborfit_token', data.token);
      localStorage.setItem('neighborfit_username', data.username);
      setAuthState({
        user: { id: '', email: data.email, name: data.username, createdAt: '', token: data.token },
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const signup = async (username: string, email: string, password: string): Promise<string | null> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      if (!res.ok) {
        let message = 'Failed to create account.';
        try {
          const text = await res.text();
          console.log('Signup error response:', text);
          const data = JSON.parse(text);
          if (data && data.message) message = data.message;
        } catch (err) {
          console.log('Error parsing signup error response:', err);
        }
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return message;
      }
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return null;
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return 'Network error. Please try again.';
    }
  };

  const logout = () => {
    localStorage.removeItem('neighborfit_token');
    localStorage.removeItem('neighborfit_username');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const updateUser = (userData: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...userData };
      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
      }));
    }
  };

  const value: AuthContextType = {
    ...authState,
    login,
    signup,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};