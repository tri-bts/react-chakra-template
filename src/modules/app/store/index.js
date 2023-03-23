import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// Reducers
import authReducer from '../../../modules/auth/slice/auth.slice';
import formAdvanceReducer from '@/modules/form-advance/slice/formAdvance.slice';
// Other Reducers ....
import informationReducer from '../../../modules/information/slice/information.slice';

const rootReducer = combineReducers({
  auth: persistReducer({ key: 'auth', storage }, authReducer),
  formAdvance: persistReducer({ key: 'form-advance', storage }, formAdvanceReducer),
  information: informationReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
