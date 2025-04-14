// src/components/Progress.jsx
import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import Card from './common/Card';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Progress() {
  const { state } = useApp();
  const { workouts } = state;
  const [selectedExercise, setSelectedExercise] = useState('');
  const [chartData, setChartData] = useState(null);

  const exercises = [...new Set(workouts.flatMap(w => 
    w.exercises.map(e => e.name)
  ))];

  useEffect(() => {
    if (selectedExercise) {
      const exerciseData = workouts
        .filter(w => w.exercises.some(e => e.name === selectedExercise))
        .map(w => ({
          date: new Date(w.date).toLocaleDateString(),
          maxWeight: Math.max(...w.exercises
            .find(e => e.name === selectedExercise)
            .sets.map(s => Number(s.weight)))
        }));

      setChartData({
        labels: exerciseData.map(d => d.date),
        datasets: [
          {
            label: 'Max Weight (kg)',
            data: exerciseData.map(d => d.maxWeight),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      });
    }
  }, [selectedExercise, workouts]);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Progress Tracking</h1>

      <Card>
        <select
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Exercise</option>
          {exercises.map((exercise) => (
            <option key={exercise} value={exercise}>
              {exercise}
            </option>
          ))}
        </select>
      </Card>

      {chartData && (
        <Card>
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: `Progress for ${selectedExercise}`,
                },
              },
            }}
          />
        </Card>
      )}
    </div>
  );
}