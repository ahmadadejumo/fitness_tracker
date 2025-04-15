// src/components/goals/GoalList.jsx
import React, { useState } from 'react';

const GoalList = ({ goals, onEdit, onDelete, onToggleComplete }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('targetDate');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
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

  // Filter goals
  const filteredGoals = goals.filter(goal => {
    if (filter === 'all') return true;
    if (filter === 'active') return !goal.completed;
    if (filter === 'completed') return goal.completed;
    return goal.category === filter;
  });

  // Sort goals
  const sortedGoals = [...filteredGoals].sort((a, b) => {
    let valueA, valueB;
    
    switch (sortBy) {
      case 'name':
        valueA = a.name.toLowerCase();
        valueB = b.name.toLowerCase();
        break;
      case 'category':
        valueA = a.category.toLowerCase();
        valueB = b.category.toLowerCase();
        break;
      case 'progress':
        valueA = a.progress;
        valueB = b.progress;
        break;
      case 'targetDate':
      default:
        valueA = new Date(a.targetDate);
        valueB = new Date(b.targetDate);
        break;
    }
    
    if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
  
  // Extract unique categories for filter
  const uniqueCategories = ['all', 'active', 'completed', ...new Set(goals.map(goal => goal.category))];

  // Get days remaining for a goal
  const getDaysRemaining = (targetDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDate);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">My Goals</h2>
        
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="block w-full pl-3 pr-10 py-1.5 text-sm border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {uniqueCategories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {sortedGoals.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {sortedGoals.map((goal) => {
            const daysRemaining = getDaysRemaining(goal.targetDate);
            const isPastDue = daysRemaining < 0 && !goal.completed;
            return (
              <div key={goal.id} className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <div className="flex items-start space-x-3 mb-2 sm:mb-0">
                    <div className="flex-shrink-0">
                      <input 
                        type="checkbox" 
                        checked={goal.completed}
                        onChange={() => onToggleComplete(goal.id)}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <h3 className={`font-medium text-lg ${goal.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {goal.name}
                      </h3>
                      <p className={`text-sm ${goal.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                        {goal.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center mt-2 sm:mt-0 gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full
                      ${goal.category === 'strength' ? 'bg-blue-100 text-blue-800' : 
                        goal.category === 'endurance' ? 'bg-green-100 text-green-800' : 
                        goal.category === 'weight' ? 'bg-purple-100 text-purple-800' : 
                        goal.category === 'habit' ? 'bg-yellow-100 text-yellow-800' : 
                        goal.category === 'nutrition' ? 'bg-red-100 text-red-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {goal.category}
                    </span>

                    {!goal.completed && (
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        isPastDue ? 'bg-red-100 text-red-800' :
                        daysRemaining <= 7 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {isPastDue 
                          ? `${Math.abs(daysRemaining)} day${Math.abs(daysRemaining) !== 1 ? 's' : ''} overdue` 
                          : daysRemaining === 0 
                            ? 'Today' 
                            : `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} left`}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className={`h-2 rounded-full ${
                        goal.progress >= 80 ? 'bg-green-500' :
                        goal.progress >= 50 ? 'bg-yellow-500' :
                        'bg-blue-500'
                      }`}
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>

                {(goal.currentValue || goal.target) && (
                  <div className="flex justify-between text-sm mb-4">
                    <span>
                      {goal.currentValue ? `Current: ${goal.currentValue} ${goal.unit}` : ''}
                    </span>
                    <span>
                      {goal.target ? `Target: ${goal.target} ${goal.unit}` : ''}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Target date: {new Date(goal.targetDate).toLocaleDateString()}
                  </div>

                  <div className="flex space-x-2">
                    <button 
                      onClick={() => onEdit(goal)} 
                      className="text-sm text-blue-600 hover:text-blue-900"
                      disabled={goal.completed}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => onDelete(goal.id)}
                      className="text-sm text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
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
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
            />
          </svg>
          <p className="mt-2 text-gray-600">
            {filter === 'all' 
              ? "You haven't created any goals yet." 
              : filter === 'active'
                ? "No active goals found."
                : filter === 'completed'
                  ? "No completed goals found."
                  : `No ${filter} goals found.`}
          </p>
          <p className="text-sm text-gray-500">
            Start by creating a new goal to track your progress.
          </p>
        </div>
      )}
    </div>
  );
};

export default GoalList;