// src/components/common/Button.jsx
import React from 'react';

export default function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}