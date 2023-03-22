import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// Reducers
import authReducer from '../../../modules/auth/slice/auth.slice';
// Other Reducers ....

const authPersistConfig = {
  key: 'auth',
  storage
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer)

  // auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(store);
