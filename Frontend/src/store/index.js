import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default to localStorage
import userSlice from "./userSlice";
import messageSlice from "./messageSlice";
import loaderSlice from "./loaderSlice";
import usersSlice from "./usersSlice";
import rolesSlice from "./rolesSlice";

const userPersistConfig = {
  key: "user", // Key for localStorage
  storage,
};

const persistedUserReducer = persistReducer(
  userPersistConfig,
  userSlice.reducer
);

const MentifyStore = configureStore({
  reducer: {
    user: persistedUserReducer,
    roles: rolesSlice.reducer,
    messages: messageSlice.reducer,
    loader: loaderSlice.reducer,
    users: usersSlice.reducer,
  },
});

export const persistor = persistStore(MentifyStore);

export default MentifyStore;
