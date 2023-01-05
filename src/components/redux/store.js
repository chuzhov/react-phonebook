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
const TEST_CONTACTS = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56', favorite: false },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12', favorite: false },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79', favorite: false },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26', favorite: false },
];

const initialState = {
  phonebook: {
    contacts: TEST_CONTACTS,
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
