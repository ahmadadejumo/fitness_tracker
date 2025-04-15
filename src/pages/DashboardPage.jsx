// src/pages/DashboardPage.jsx
import React from 'react';
import Dashboard from '../components/dashboard/Dashboard';

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your fitness progress and activities
        </p>
      </div>
      
      <Dashboard />
    </div>
  );
};

export default DashboardPage;