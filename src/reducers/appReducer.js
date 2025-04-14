// src/reducers/appReducer.js
export const appReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return { ...state, ...action.payload };

    case 'ADD_WORKOUT':
      return {
        ...state,
        workouts: [...state.workouts, { ...action.payload, id: Date.now() }],
      };

    case 'UPDATE_WORKOUT':
      return {
        ...state,
        workouts: state.workouts.map((workout) =>
          workout.id === action.payload.id ? action.payload : workout
        ),
      };

    case 'SET_CURRENT_WORKOUT':
      return {
        ...state,
        currentWorkout: action.payload,
      };

    case 'ADD_GOAL':
      return {
        ...state,
        goals: [...state.goals, { ...action.payload, id: Date.now() }],
      };

    case 'UPDATE_GOAL':
      return {
        ...state,
        goals: state.goals.map((goal) =>
          goal.id === action.payload.id ? action.payload : goal
        ),
      };

    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };

    default:
      return state;
  }
};