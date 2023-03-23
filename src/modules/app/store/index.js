import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// Reducers
import authReducer from '../../../modules/auth/slice/auth.slice';
import formAdvanceReducer from '@/modules/form-advance/slice/formAdvance.slice';
import familyReducer from '@/modules/family-tree/slice/family.slice';
import formUniqueReducer from '@/modules/form-unique/slice/formUnique.slice';
import informationReducer from '@/modules/information/slice/information.slice';
import eventReducer from '@/modules/event/slice/event.slice';

const rootReducer = combineReducers({
  auth: persistReducer({ key: 'auth', storage }, authReducer),
  formAdvance: persistReducer({ key: 'form-advance', storage }, formAdvanceReducer),
  family: persistReducer({ key: 'family', storage }, familyReducer),
  formUnique: persistReducer({ key: 'form-unique', storage }, formUniqueReducer),
  event: persistReducer({ key: 'event', storage }, eventReducer),
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
