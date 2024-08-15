import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';  // Import the reducer from the user slice

export const store = configureStore({
  reducer: { user: userReducer },  // Use the imported reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
