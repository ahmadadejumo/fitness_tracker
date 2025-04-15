// src/components/workouts/WorkoutList.jsx
import React, { useState } from 'react';

const WorkoutList = ({ workouts, onEdit, onDelete }) => {
  const [sortBy, setSortBy] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filter, setFilter] = useState('all');

  const handleSort = (column) => {
    if (sortBy === column) {
      // Toggle sort direction if clicking the same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new column and default to descending
      setSortBy(column);
      setSortDirection('desc');
    }
  };

  const renderSortIcon = (column) => {
    if (sortBy !== column) return null;
    
    return (
      <span className="ml-1 inline-block">
        {sortDirection === 'asc' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </span>
    );
  };
  
  // Filter workouts
  const filteredWorkouts = workouts.filter(workout => {
    if (filter === 'all') return true;
    return workout.type === filter;
  });

  // Sort workouts
  const sortedWorkouts = [...filteredWorkouts].sort((a, b) => {
    let valueA, valueB;
    
    switch (sortBy) {
      case 'name':
        valueA = a.name.toLowerCase();
        valueB = b.name.toLowerCase();
        break;
      case 'type':
        valueA = a.type.toLowerCase();
        valueB = b.type.toLowerCase();
        break;
      case 'duration':
        valueA = a.duration;
        valueB = b.duration;
        break;
      case 'calories':
        valueA = a.calories;
        valueB = b.calories;
        break;
      case 'date':
      default:
        valueA = new Date(a.date);
        valueB = new Date(b.date);
        break;
    }
    
    if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Get unique workout types for filter
  const workoutTypes = ['all', ...new Set(workouts.map(workout => workout.type))];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">My Workouts</h2>
        
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="block w-full pl-3 pr-10 py-1.5 text-sm border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {workoutTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {sortedWorkouts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Workout {renderSortIcon('name')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('type')}
                >
                  <div className="flex items-center">
                    Type {renderSortIcon('type')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('duration')}
                >
                  <div className="flex items-center">
                    Duration {renderSortIcon('duration')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('calories')}
                >
                  <div className="flex items-center">
                    Calories {renderSortIcon('calories')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center">
                    Date {renderSortIcon('date')}
                  </div>
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedWorkouts.map((workout) => (
                <tr key={workout.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{workout.name}</div>
                    {workout.notes && (
                      <div className="text-xs text-gray-500 truncate max-w-xs">{workout.notes}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${workout.type === 'Strength' ? 'bg-blue-100 text-blue-800' : 
                        workout.type === 'Cardio' ? 'bg-red-100 text-red-800' : 
                        workout.type === 'Flexibility' ? 'bg-green-100 text-green-800' : 
                        workout.type === 'Balance' ? 'bg-purple-100 text-purple-800' : 
                        workout.type === 'Sports' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {workout.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {workout.duration} min
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {workout.calories} cal
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(workout.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2 justify-end">
                      <button 
                        onClick={() => onEdit(workout)} 
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => onDelete(workout.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-10 text-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="mx-auto h-12 w-12 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
            />
          </svg>
          <p className="mt-2 text-gray-600">
            {filter === 'all' 
              ? "You haven't logged any workouts yet." 
              : `No ${filter.toLowerCase()} workouts found.`}
          </p>
          <p className="text-sm text-gray-500">
            Add a workout to start tracking your fitness journey.
          </p>
        </div>
      )}
    </div>
  );
};

export default WorkoutList;