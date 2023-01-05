import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import phonebookReducer from './phonebookSlice/phonebookSlice';

const LOCAL_STORAGE_KEY_CONTACTS = 'contacts';

const initialState = {
  phonebook: {
    contacts: [],
    filter: '',
  },
};

const persistPhonebookConfig = {
  key: LOCAL_STORAGE_KEY_CONTACTS,
  version: 1,
  storage, //imported from redux-persist/lib/storage
};

const persistedPhonebookReducer = persistReducer(
  persistPhonebookConfig,
  phonebookReducer
);

export const store = configureStore({
  reducer: {
    phonebook: persistedPhonebookReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  preloadedState: initialState,
});

export const persistor = persistStore(store);
