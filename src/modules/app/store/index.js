import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// Reducers
import authReducer from '../../../modules/auth/slice/auth.slice';
import formAdvanceReducer from '@/modules/form-advance/slice/formAdvance.slice';
import familyReducer from '@/modules/family-tree/slice/family.slice';
// Other Reducers ....

const rootReducer = combineReducers({
  auth: persistReducer({ key: 'auth', storage }, authReducer),
  formAdvance: persistReducer({ key: 'form-advance', storage }, formAdvanceReducer),
  family: persistReducer({ key: 'family', storage }, familyReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
