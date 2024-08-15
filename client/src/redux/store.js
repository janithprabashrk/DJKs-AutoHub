import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';  // Import the reducer from the user slice
import {persistReducer, persistStore} from 'redux-persist';  // Import the persist reducer
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({user: userReducer});  // Create a root reducer  

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);  // Persist the root reducer

export const store = configureStore({
  reducer: persistedReducer,  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);  // Create a persistor object