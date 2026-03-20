import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import {
    persistReducer,
    persistStore,
    FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import companySlice from "./companyslice"
import applicationSlice from "./applicationSlice";
import messageReducer from './messageSlice'

// ✅ force clear old corrupted storage on version change
if (typeof window !== 'undefined') {
    const currentVersion = localStorage.getItem('persist_version');
    if (currentVersion !== '2') {
        localStorage.clear();
        localStorage.setItem('persist_version', '2');
    }
}

const persistConfig = {
    key: 'root',
    version: 2,
    storage,
    whitelist: ['auth'],
    migrate: () => Promise.resolve(undefined),
}

const rootReducer = combineReducers({
    auth: authSlice,
    job: jobSlice,
    company: companySlice,
    application: applicationSlice,
    message: messageReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export default store;