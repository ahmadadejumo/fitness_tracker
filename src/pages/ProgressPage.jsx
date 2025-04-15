// src/pages/ProgressPage.jsx
import React, { useState } from 'react';
import ProgressCharts from '../components/progress/ProgressCharts';
import { mockWorkouts, mockWeightData } from '../utils/mockData';

const ProgressPage = () => {
  const [weightEntry, setWeightEntry] = useState({ weight: '', date: new Date().toISOString().split('T')[0] });
  const [weightData, setWeightData] = useState(mockWeightData);
  const [error, setError] = useState('');

  const handleWeightChange = (e) => {
    const { name, value } = e.target;
    setWeightEntry(prev => ({ ...prev, [name]: value }));
  };

  const handleWeightSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!weightEntry.weight || isNaN(weightEntry.weight) || parseFloat(weightEntry.weight) <= 0) {
      setError('Please enter a valid weight');
      return;
    }

    // Check if we already have an entry for this date
    const existingEntryIndex = weightData.findIndex(
      entry => new Date(entry.date).toISOString().split('T')[0] === weightEntry.date
    );

    if (existingEntryIndex >= 0) {
      // Update existing entry
      const updatedData = [...weightData];
      updatedData[existingEntryIndex] = { 
        date: weightEntry.date,
        weight: parseFloat(weightEntry.weight)
      };
      setWeightData(updatedData);
    } else {
      // Add new entry and sort by date
      const newData = [...weightData, { 
        date: weightEntry.date,
        weight: parseFloat(weightEntry.weight)
      }];
      newData.sort((a, b) => new Date(a.date) - new Date(b.date));
      setWeightData(newData);
    }

    // Reset form
    setWeightEntry({ weight: '', date: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">Progress</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track your fitness and health metrics over time
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <ProgressCharts workouts={mockWorkouts} weightData={weightData} />
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Log Your Weight</h2>
          
          <form onSubmit={handleWeightSubmit}>
            <div className="mb-4">
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                Weight (lbs)
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={weightEntry.weight}
                onChange={handleWeightChange}
                step="0.1"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your weight"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={weightEntry.date}
                onChange={handleWeightChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            {error && (
              <div className="mb-4 text-sm text-red-600">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Log Weight
            </button>
          </form>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Entries</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {weightData.slice().reverse().slice(0, 5).map((entry, index) => (
                <div key={index} className="flex justify-between text-sm p-2 border-b">
                  <span>{new Date(entry.date).toLocaleDateString()}</span>
                  <span className="font-medium">{entry.weight} lbs</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;