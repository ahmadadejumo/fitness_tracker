// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import AuthForm from '../components/auth/AuthForm';

const LoginPage = ({ onLogin, switchPage }) => {
  const [loginError, setLoginError] = useState('');

  const handleLogin = (formData) => {
    // In a real app, this would call an API to verify credentials
    // For demo purposes, we'll use a simple check
    if (formData.email === 'demo@example.com' && formData.password === 'password') {
      const userData = {
        id: '1',
        name: 'Demo User',
        email: formData.email,
      };
      onLogin(userData);
    } else {
      setLoginError('Invalid email or password. Try demo@example.com / password');
    }
  };

  const handleSwitchToRegister = () => {
    switchPage('register');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">FitTrack</h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Your personal fitness tracking companion
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {loginError && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{loginError}</p>
              </div>
            </div>
          </div>
        )}

        <AuthForm 
          isLogin={true} 
          onSubmit={handleLogin} 
          switchForm={handleSwitchToRegister}
        />
        
        <div className="mt-6 px-4 sm:px-0">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Demo credentials
              </span>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Email: demo@example.com</p>
            <p>Password: password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;