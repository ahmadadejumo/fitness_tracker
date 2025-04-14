// src/components/common/Card.jsx
import React from 'react';

export default function Card({ children, title }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
      {children}
    </div>
  );
}