// src/components/Dashboard.jsx
import React from 'react';
import { useApp } from '../contexts/AppContext';
import Card from './common/Card';

export default function Dashboard() {
  const { state } = useApp();
  const { workouts, goals } = state;

  const recentWorkouts = workouts.slice(-3);
  const activeGoals = goals.filter(goal => !goal.completed);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      
      <Card title="Quick Stats">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-xl font-bold">{workouts.length}</p>
            <p className="text-gray-600">Total Workouts</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{activeGoals.length}</p>
            <p className="text-gray-600">Active Goals</p>
          </div>
        </div>
      </Card>

      <Card title="Recent Workouts">
        {recentWorkouts.length > 0 ? (
          <ul className="space-y-2">
            {recentWorkouts.map((workout) => (
              <li key={workout.id} className="p-2 bg-gray-50 rounded">
                <p className="font-medium">{workout.name}</p>
                <p className="text-sm text-gray-600">
                  {new Date(workout.date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No recent workouts</p>
        )}
      </Card>

      <Card title="Active Goals">
        {activeGoals.length > 0 ? (
          <ul className="space-y-2">
            {activeGoals.map((goal) => (
              <li key={goal.id} className="p-2 bg-gray-50 rounded">
                <p className="font-medium">{goal.name}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No active goals</p>
        )}
      </Card>
    </div>
  );
}