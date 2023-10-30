import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default to local storage
import authReducer from '../features/authSlice';
import eventReducer from '../features/eventSlice';


const rootReducer = combineReducers({
  auth: authReducer,
  event: eventReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', "event"], // Add the slice names you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
