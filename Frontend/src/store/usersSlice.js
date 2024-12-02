import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    initializeUsers: (state, action) => {
      return [...action.payload]; // Replace the state with the payload array
    },
    addUser: (state, action) => {
      state.push(action.payload); // Adds a new user to the array
    },
    updateUser: (state, action) => {
      const { id, data } = action.payload;
      const userIndex = state.findIndex((user) => user.id === id);
      if (userIndex >= 0) {
        state[userIndex] = { ...state[userIndex], ...data }; // Update user details
      }
    },
    deleteUser: (state, action) => {
      return state.filter((user) => user.id !== action.payload); // Remove user by ID
    },
    clearUsers: () => {
      return []; // Reset state to an empty array
    },
  },
});

export const usersSliceActions = usersSlice.actions;

export default usersSlice;
