// src/contexts/AppContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { appReducer } from '../reducers/appReducer';
import { loadData, saveData } from '../utils/storage';

const AppContext = createContext();

const initialState = {
  workouts: [],
  goals: [],
  currentWorkout: null,
  theme: 'light',
};

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const loadInitialData = async () => {
      const data = await loadData();
      if (data) {
        dispatch({ type: 'INITIALIZE', payload: data });
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    saveData(state);
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};