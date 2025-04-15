// src/components/dashboard/Dashboard.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { mockWorkouts, mockGoals, mockWeightData } from '../../utils/mockData';

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);

  // Get recent data
  const recentWorkouts = mockWorkouts.slice(0, 3);
  const activeGoals = mockGoals.filter((goal) => !goal.completed).slice(0, 3);

  // Calculate statistics
  const totalWorkouts = mockWorkouts.length;
  const totalWorkoutTime = mockWorkouts.reduce((sum, workout) => sum + workout.duration, 0);
  const completedGoals = mockGoals.filter((goal) => goal.completed).length;

  // Weight change calculation
  const weightData = mockWeightData.sort((a, b) => new Date(a.date) - new Date(b.date));
  const initialWeight = weightData[0]?.weight || 0;
  const currentWeight = weightData[weightData.length - 1]?.weight || 0;
  const weightChange = currentWeight - initialWeight;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
          Welcome back, {currentUser?.name || 'User'}
        </h1>
        <p className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-5 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-500">Total Workouts</h2>
            <span className="p-2 text-blue-600 bg-blue-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  transform="rotate(90 12 12)"
                />
              </svg>
            </span>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-800">{totalWorkouts}</p>
          <p className="mt-1 text-sm text-gray-500">Last 30 days</p>
        </div>

        <div className="p-5 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-500">Workout Time</h2>
            <span className="p-2 text-green-600 bg-green-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-800">
            {Math.round(totalWorkoutTime / 60)} hrs
          </p>
          <p className="mt-1 text-sm text-gray-500">Total time</p>
        </div>

        <div className="p-5 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-500">Completed Goals</h2>
            <span className="p-2 text-purple-600 bg-purple-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-800">{completedGoals}</p>
          <p className="mt-1 text-sm text-gray-500">All time</p>
        </div>

        <div className="p-5 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-500">Weight Change</h2>
            <span
              className={`p-2 ${
                weightChange <= 0 ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
              } rounded-full`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    weightChange <= 0
                      ? 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                      : 'M13 17h8m0 0V9m0 8l-8-8-4 4-6-6'
                  }
                />
              </svg>
            </span>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-800">
            {Math.abs(weightChange).toFixed(1)}{' '}
            {weightChange === 0 ? '' : weightChange < 0 ? 'lbs ↓' : 'lbs ↑'}
          </p>
          <p className="mt-1 text-sm text-gray-500">Since start</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Workouts */}
        <div className="p-5 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Workouts</h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentWorkouts.length > 0 ? (
              recentWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="flex items-center p-3 transition-colors border rounded-lg hover:bg-gray-50"
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      workout.type === 'Cardio'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    {workout.type === 'Cardio' ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          transform="rotate(90 12 12)"
                        />
                      </svg>
                    )}
                  </div>

                  <div className="flex-1 ml-4">
                    <h3 className="text-sm font-medium text-gray-800">{workout.name}</h3>
                    <p className="text-xs text-gray-500">
                      {new Date(workout.date).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">{workout.duration} mins</p>
                    <p className="text-xs text-gray-500">{workout.type}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No recent workouts found.</p>
            )}
          </div>
        </div>

        {/* Active Goals */}
        <div className="p-5 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Active Goals</h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {activeGoals.length > 0 ? (
              activeGoals.map((goal) => (
                <div key={goal.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-800">{goal.name}</h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        goal.progress >= 80
                          ? 'bg-green-100 text-green-800'
                          : goal.progress >= 50
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {goal.progress}% Complete
                    </span>
                  </div>

                  <p className="mb-2 text-sm text-gray-600">{goal.description}</p>

                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className={`h-2 rounded-full ${
                        goal.progress >= 80
                          ? 'bg-green-500'
                          : goal.progress >= 50
                          ? 'bg-yellow-500'
                          : 'bg-blue-500'
                      }`}
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      Target: {new Date(goal.targetDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No active goals found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
