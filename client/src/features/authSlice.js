import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logoutUser: (state, action) => {
      state.user = null;
      state.isAuthenticated = false
    }
  },
});


export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
