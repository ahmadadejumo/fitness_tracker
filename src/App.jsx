// src/App.jsx
import React, { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import WorkoutsPage from './pages/WorkoutsPage';
import GoalsPage from './pages/GoalsPage';
import ProgressPage from './pages/ProgressPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check for existing login
  useEffect(() => {
    const savedUser = localStorage.getItem('fittrack_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);
  
  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('fittrack_user', JSON.stringify(userData));
    setCurrentPage('dashboard');
  };
  
  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('fittrack_user');
    setCurrentPage('login');
  };
  
  const renderPage = () => {
    if (!isAuthenticated) {
      if (currentPage === 'register') {
        return <RegisterPage onLogin={handleLogin} switchPage={setCurrentPage} />;
      }
      return <LoginPage onLogin={handleLogin} switchPage={setCurrentPage} />;
    }
    
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'workouts':
        return <WorkoutsPage />;
      case 'goals':
        return <GoalsPage />;
      case 'progress':
        return <ProgressPage />;
      default:
        return <DashboardPage />;
    }
  };
  
  return (
    <AuthProvider value={{ currentUser, isAuthenticated, onLogin: handleLogin, onLogout: handleLogout }}>
      {isAuthenticated ? (
        <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
          {renderPage()}
        </Layout>
      ) : (
        renderPage()
      )}
    </AuthProvider>
  );
}

export default App;