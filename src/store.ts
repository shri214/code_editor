import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // This uses localStorage by default
import modalSlice from "./RTK/modalSlice";
import playgroundSlice from "./RTK/playgroundSlice";
import propSlice from "./RTK/propSlice";

// Create a persist configuration
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, playgroundSlice);

const store = configureStore({
  reducer: {
    modal: modalSlice,
    playgrounds: persistedReducer,
    props:propSlice,
  },
  // Optional: add middleware for more complex setups
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
