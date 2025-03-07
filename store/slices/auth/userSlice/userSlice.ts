import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";
// Initial state for user information
const initialState: {
  userId: string | null;
  name: string | null;
  avatarUrl: string | null;
  email: string | null;
  scope: string[];
} = {
  userId: null,
  name: null,
  avatarUrl: null,
  email: null,
  scope: [],
};
interface CustomJwtPayload extends JwtPayload {
  USER_ID?: string;
  name?: string;
  AVATAR_URL?: string;
  email?: string;
  scope?: string[];
}

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to update user information
    updateUser(state, action) {
      const { userId, name, avatarUrl, email, scope } = action.payload;
      state.userId = userId || state.userId;
      state.name = name || state.name;
      state.avatarUrl = avatarUrl || state.avatarUrl;
      state.email = email || state.email;
      state.scope = scope || state.scope;
    },

    // Action to clear user information (e.g., on logout)
    clearUser(state) {
      state.userId = null;
      state.name = null;
      state.avatarUrl = null;
      state.email = null;
      state.scope = [];
    },

    initializeUser(state) {
      const token = Cookies.get("_access_token");
      if (token) {
        try {
          const decoded: CustomJwtPayload = jwtDecode<CustomJwtPayload>(token);
          state.userId = decoded.USER_ID || null;
          state.name = decoded.name || null;
          state.avatarUrl = decoded.AVATAR_URL || null;
          state.email = decoded.email || null;
          state.scope = decoded.scope || [];
        } catch (error) {
          console.error("Invalid token:", error);
        }
      }
    },
  },
});
// Export actions and reducer
export const { updateUser, clearUser, initializeUser } = userSlice.actions;
export default userSlice.reducer;
