import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/citySlicecopy';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
