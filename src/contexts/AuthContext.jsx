// src/contexts/AuthContext.jsx
import React, { createContext } from 'react';

// Create the auth context
export const AuthContext = createContext({
  currentUser: null,
  isAuthenticated: false,
  onLogin: () => {},
  onLogout: () => {},
});

// Create provider component
export const AuthProvider = ({ children, value }) => {
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};