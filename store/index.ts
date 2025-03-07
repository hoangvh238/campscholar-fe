import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "./queries/base";
import { authAPI } from "./queries/auth";
import auth from "./slices/auth";
import { storageApi } from "./queries/minioStorage";
import { rtkQueryErrorLogger } from "./midleware";
import { userProfileApi } from "./queries/usersMangement";

import userReducer from "@/store/slices/auth/userSlice/userSlice";
import { updateClassroomAPI } from "./queries/classroom";

export const store = configureStore({
  reducer: {
    [authAPI.reducerPath]: authAPI.reducer, // For auth API
    [storageApi.reducerPath]: storageApi.reducer, // For storage API
    [userProfileApi.reducerPath]: userProfileApi.reducer,
    [updateClassroomAPI.reducerPath]: updateClassroomAPI.reducer,
    auth, // For auth slice
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware) // For base API
      .concat(authAPI.middleware) // For auth API
      .concat(storageApi.middleware) // For storage API
      .concat(userProfileApi.middleware)
      .concat(updateClassroomAPI.middleware)
      .concat(rtkQueryErrorLogger), // For error logging middleware
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { posts: PostsState, comments: CommentsState, users: UsersState }
export type AppDispatch = typeof store.dispatch;
