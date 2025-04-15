// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import AuthForm from '../components/auth/AuthForm';

const RegisterPage = ({ onLogin, switchPage }) => {
  const [registerError, setRegisterError] = useState('');

  const handleRegister = (formData) => {
    // In a real app, this would call an API to create a new account
    // For demo purposes, we'll simulate account creation and auto-login
    
    // Simple validation
    if (formData.password.length < 6) {
      setRegisterError('Password must be at least 6 characters');
      return;
    }
    
    // Create user and login
    const userData = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
    };
    
    // Auto login after successful registration
    onLogin(userData);
  };

  const handleSwitchToLogin = () => {
    switchPage('login');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">FitTrack</h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Start your fitness journey today
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {registerError && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{registerError}</p>
              </div>
            </div>
          </div>
        )}

        <AuthForm 
          isLogin={false} 
          onSubmit={handleRegister} 
          switchForm={handleSwitchToLogin}
        />
      </div>
    </div>
  );
};

export default RegisterPage;