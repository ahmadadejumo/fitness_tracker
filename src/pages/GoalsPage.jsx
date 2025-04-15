// src/pages/GoalsPage.jsx
import React, { useState } from 'react';
import GoalList from '../components/goals/GoalList';
import GoalForm from '../components/goals/GoalForm';
import { mockGoals } from '../utils/mockData';

const GoalsPage = () => {
  const [goals, setGoals] = useState(mockGoals);
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const handleAddGoal = (goal) => {
    if (editingGoal) {
      // Update existing goal
      setGoals(goals.map(g => g.id === goal.id ? goal : g));
      setEditingGoal(null);
    } else {
      // Add new goal
      setGoals([goal, ...goals]);
    }
    setShowForm(false);
  };

  const handleEditGoal = (goal) => {
    setEditingGoal(goal);
    setShowForm(true);
  };

  const handleDeleteGoal = (goalId) => {
    if (confirm('Are you sure you want to delete this goal?')) {
      setGoals(goals.filter(goal => goal.id !== goalId));
    }
  };

  const handleToggleComplete = (goalId) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const completed = !goal.completed;
        return {
          ...goal,
          completed,
          progress: completed ? 100 : goal.progress
        };
      }
      return goal;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">Goals</h1>
          <p className="mt-1 text-sm text-gray-500">
            Set and track your fitness goals
          </p>
        </div>
        <button
          onClick={() => {
            setEditingGoal(null);
            setShowForm(true);
          }}
          className="mt-3 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create New Goal
        </button>
      </div>
      
      {showForm ? (
        <GoalForm 
          onAddGoal={handleAddGoal} 
          onCancel={() => {
            setShowForm(false);
            setEditingGoal(null);
          }}
          initialData={editingGoal}
        />
      ) : (
        <GoalList 
          goals={goals} 
          onEdit={handleEditGoal}
          onDelete={handleDeleteGoal}
          onToggleComplete={handleToggleComplete}
        />
      )}
    </div>
  );
};

export default GoalsPage;