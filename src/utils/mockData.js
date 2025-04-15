// src/utils/mockData.js
// This file contains mock data for the fitness tracker application

// Generate a date with specified days offset from today
const getDateWithOffset = (daysOffset) => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString().split('T')[0];
};

// Mock workouts data
export const mockWorkouts = [
  {
    id: '1',
    name: 'Morning Run',
    type: 'Cardio',
    duration: 45,
    calories: 450,
    date: getDateWithOffset(-1),
    notes: 'Easy 5k run around the neighborhood. Felt good!'
  },
  {
    id: '2',
    name: 'Upper Body Workout',
    type: 'Strength',
    duration: 60,
    calories: 320,
    date: getDateWithOffset(-3),
    notes: 'Chest, shoulders and triceps. Increased bench press weight.'
  },
  {
    id: '3',
    name: 'Yoga Session',
    type: 'Flexibility',
    duration: 30,
    calories: 150,
    date: getDateWithOffset(-4),
    notes: 'Focus on hip flexibility and stress relief.'
  },
  {
    id: '4',
    name: 'HIIT Training',
    type: 'Cardio',
    duration: 25,
    calories: 380,
    date: getDateWithOffset(-6),
    notes: 'High intensity interval training - 30 sec on, 15 sec rest.'
  },
  {
    id: '5',
    name: 'Lower Body Strength',
    type: 'Strength',
    duration: 50,
    calories: 280,
    date: getDateWithOffset(-8),
    notes: 'Squats, lunges, and deadlifts. Legs feeling strong!'
  },
  {
    id: '6',
    name: 'Swimming',
    type: 'Cardio',
    duration: 40,
    calories: 350,
    date: getDateWithOffset(-10),
    notes: '20 laps freestyle, 10 laps backstroke.'
  },
  {
    id: '7',
    name: 'Core Training',
    type: 'Strength',
    duration: 30,
    calories: 200,
    date: getDateWithOffset(-12),
    notes: 'Focused on abs and lower back exercises.'
  },
  {
    id: '8',
    name: 'Cycling',
    type: 'Cardio',
    duration: 75,
    calories: 520,
    date: getDateWithOffset(-15),
    notes: 'Long ride through the hills. Great weather!'
  },
  {
    id: '9',
    name: 'Full Body Workout',
    type: 'Strength',
    duration: 65,
    calories: 400,
    date: getDateWithOffset(-18),
    notes: 'Compound movements focusing on full body strength.'
  },
  {
    id: '10',
    name: 'Basketball',
    type: 'Sports',
    duration: 90,
    calories: 650,
    date: getDateWithOffset(-21),
    notes: 'Pickup game with friends. Intense and fun!'
  },
  {
    id: '11',
    name: 'Balance Training',
    type: 'Balance',
    duration: 25,
    calories: 120,
    date: getDateWithOffset(-24),
    notes: 'Working on stability and coordination.'
  },
  {
    id: '12',
    name: 'Hill Sprints',
    type: 'Cardio',
    duration: 30,
    calories: 380,
    date: getDateWithOffset(-28),
    notes: '10 sprints up the hill near home. Tough but effective!'
  }
];

// Mock goals data
export const mockGoals = [
  {
    id: '1',
    name: 'Run a 5K',
    description: 'Complete a 5K run without stopping',
    category: 'endurance',
    targetDate: getDateWithOffset(20),
    createdAt: getDateWithOffset(-30),
    progress: 75,
    target: '5',
    currentValue: '3.75',
    unit: 'km',
    completed: false
  },
  {
    id: '2',
    name: 'Increase Bench Press',
    description: 'Work up to bench pressing 200 lbs',
    category: 'strength',
    targetDate: getDateWithOffset(45),
    createdAt: getDateWithOffset(-60),
    progress: 85,
    target: '200',
    currentValue: '170',
    unit: 'lbs',
    completed: false
  },
  {
    id: '3',
    name: 'Lose 10 Pounds',
    description: 'Healthy weight loss through diet and exercise',
    category: 'weight',
    targetDate: getDateWithOffset(30),
    createdAt: getDateWithOffset(-45),
    progress: 60,
    target: '10',
    currentValue: '6',
    unit: 'lbs',
    completed: false
  },
  {
    id: '4',
    name: 'Do 10 Pull-ups',
    description: 'Build upper body strength',
    category: 'strength',
    targetDate: getDateWithOffset(-5),
    createdAt: getDateWithOffset(-60),
    progress: 100,
    target: '10',
    currentValue: '10',
    unit: 'reps',
    completed: true
  },
  {
    id: '5',
    name: 'Morning Workout Routine',
    description: 'Establish a consistent morning workout habit',
    category: 'habit',
    targetDate: getDateWithOffset(15),
    createdAt: getDateWithOffset(-20),
    progress: 40,
    target: '30',
    currentValue: '12',
    unit: 'days',
    completed: false
  },
  {
    id: '6',
    name: 'Increase Protein Intake',
    description: 'Consume at least 120g of protein daily',
    category: 'nutrition',
    targetDate: getDateWithOffset(10),
    createdAt: getDateWithOffset(-15),
    progress: 80,
    target: '120',
    currentValue: '96',
    unit: 'grams',
    completed: false
  },
  {
    id: '7',
    name: 'Complete 30-Day Yoga Challenge',
    description: 'Practice yoga every day for 30 days',
    category: 'habit',
    targetDate: getDateWithOffset(-2),
    createdAt: getDateWithOffset(-32),
    progress: 100,
    target: '30',
    currentValue: '30',
    unit: 'days',
    completed: true
  }
];

// Mock weight tracking data
export const mockWeightData = [
  { date: getDateWithOffset(-90), weight: 185.0 },
  { date: getDateWithOffset(-80), weight: 183.5 },
  { date: getDateWithOffset(-70), weight: 182.0 },
  { date: getDateWithOffset(-60), weight: 181.0 },
  { date: getDateWithOffset(-50), weight: 179.5 },
  { date: getDateWithOffset(-40), weight: 180.0 },
  { date: getDateWithOffset(-30), weight: 178.5 },
  { date: getDateWithOffset(-25), weight: 177.0 },
  { date: getDateWithOffset(-20), weight: 176.5 },
  { date: getDateWithOffset(-15), weight: 175.0 },
  { date: getDateWithOffset(-10), weight: 174.5 },
  { date: getDateWithOffset(-5), weight: 174.0 },
  { date: getDateWithOffset(-1), weight: 173.5 }
];