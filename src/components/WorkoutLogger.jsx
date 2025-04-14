// src/components/WorkoutLogger.jsx
import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import Button from './common/Button';
import Card from './common/Card';

export default function WorkoutLogger() {
  const { dispatch } = useApp();
  const [workout, setWorkout] = useState({
    name: '',
    exercises: [{ name: '', sets: [{ weight: '', reps: '' }] }],
    notes: '',
  });

  const addSet = (exerciseIndex) => {
    const newWorkout = { ...workout };
    newWorkout.exercises[exerciseIndex].sets.push({ weight: '', reps: '' });
    setWorkout(newWorkout);
  };

  const addExercise = () => {
    setWorkout({
      ...workout,
      exercises: [...workout.exercises, { name: '', sets: [{ weight: '', reps: '' }] }],
    });
  };

  const updateSet = (exerciseIndex, setIndex, field, value) => {
    const newWorkout = { ...workout };
    newWorkout.exercises[exerciseIndex].sets[setIndex][field] = value;
    setWorkout(newWorkout);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_WORKOUT',
      payload: {
        ...workout,
        date: new Date().toISOString(),
      },
    });
    setWorkout({
      name: '',
      exercises: [{ name: '', sets: [{ weight: '', reps: '' }] }],
      notes: '',
    });
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Log Workout</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <input
            type="text"
            placeholder="Workout Name"
            value={workout.name}
            onChange={(e) => setWorkout({ ...workout, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </Card>

        {workout.exercises.map((exercise, exerciseIndex) => (
          <Card key={exerciseIndex}>
            <input
              type="text"
              placeholder="Exercise Name"
              value={exercise.name}
              onChange={(e) => {
                const newWorkout = { ...workout };
                newWorkout.exercises[exerciseIndex].name = e.target.value;
                setWorkout(newWorkout);
              }}
              className="w-full p-2 border rounded mb-4"
              required
            />

            <div className="space-y-2">
              {exercise.sets.map((set, setIndex) => (
                <div key={setIndex} className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Weight (kg)"
                    value={set.weight}
                    onChange={(e) => updateSet(exerciseIndex, setIndex, 'weight', e.target.value)}
                    className="p-2 border rounded"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Reps"
                    value={set.reps}
                    onChange={(e) => updateSet(exerciseIndex, setIndex, 'reps', e.target.value)}
                    className="p-2 border rounded"
                    required
                  />
                </div>
              ))}
            </div>

            <Button
              type="button"
              onClick={() => addSet(exerciseIndex)}
              className="mt-2"
            >
              Add Set
            </Button>
          </Card>
        ))}

        <Button type="button" onClick={addExercise}>
          Add Exercise
        </Button>

        <Card>
          <textarea
            placeholder="Workout Notes"
            value={workout.notes}
            onChange={(e) => setWorkout({ ...workout, notes: e.target.value })}
            className="w-full p-2 border rounded"
            rows="3"
          />
        </Card>

        <Button type="submit">Save Workout</Button>
      </form>
    </div>
  );
}