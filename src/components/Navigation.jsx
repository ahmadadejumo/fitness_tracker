// src/components/Navigation.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();

  const links = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/workout', label: 'Log Workout', icon: '💪' },
    { path: '/progress', label: 'Progress', icon: '📈' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="flex justify-around py-2">
        {links.map(({ path, label, icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center p-2 rounded-lg ${
              location.pathname === path
                ? 'text-blue-600'
                : 'text-gray-600'
            }`}
          >
            <span className="text-2xl">{icon}</span>
            <span className="text-xs mt-1">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}