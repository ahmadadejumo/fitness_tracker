// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Dashboard from './components/Dashboard';
import WorkoutLogger from './components/WorkoutLogger';
import Progress from './components/Progress';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <AppProvider>
        <div className="min-h-screen bg-gray-100 pb-16">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/workout" element={<WorkoutLogger />} />
            <Route path="/progress" element={<Progress />} />
          </Routes>
          <Navigation />
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;