// src/pages/WorkoutsPage.jsx
import React, { useState } from 'react';
import WorkoutList from '../components/workouts/WorkoutList';
import WorkoutForm from '../components/workouts/WorkoutForm';
import { mockWorkouts } from '../utils/mockData';

const WorkoutsPage = () => {
  const [workouts, setWorkouts] = useState(mockWorkouts);
  const [showForm, setShowForm] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(null);

  const handleAddWorkout = (workout) => {
    if (editingWorkout) {
      // Update existing workout
      setWorkouts(workouts.map(w => w.id === workout.id ? workout : w));
      setEditingWorkout(null);
    } else {
      // Add new workout
      setWorkouts([workout, ...workouts]);
    }
    setShowForm(false);
  };

  const handleEditWorkout = (workout) => {
    setEditingWorkout(workout);
    setShowForm(true);
  };

  const handleDeleteWorkout = (workoutId) => {
    if (confirm('Are you sure you want to delete this workout?')) {
      setWorkouts(workouts.filter(workout => workout.id !== workoutId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">Workouts</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track and manage your workout sessions
          </p>
        </div>
        <button
          onClick={() => {
            setEditingWorkout(null);
            setShowForm(true);
          }}
          className="mt-3 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Log New Workout
        </button>
      </div>
      
      {showForm ? (
        <WorkoutForm 
          onAddWorkout={handleAddWorkout} 
          onCancel={() => {
            setShowForm(false);
            setEditingWorkout(null);
          }}
          initialData={editingWorkout}
        />
      ) : (
        <WorkoutList 
          workouts={workouts} 
          onEdit={handleEditWorkout}
          onDelete={handleDeleteWorkout}
        />
      )}
    </div>
  );
};

export default WorkoutsPage;