// src/utils/storage.js
const STORAGE_KEY = 'fitness_tracker_data';

export const saveData = async (data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, serializedData);
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export const loadData = async () => {
  try {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    return serializedData ? JSON.parse(serializedData) : null;
  } catch (error) {
    console.error('Error loading data:', error);
    return null;
  }
};