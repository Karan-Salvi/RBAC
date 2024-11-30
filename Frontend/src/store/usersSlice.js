import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    initializeUsers: (state, action) => {
      console.log("Initializing users state with:", action.payload);
      return [...action.payload]; // Replace the state with the payload array
    },
    addUser: (state, action) => {
      console.log("Adding user:", action.payload);
      state.push(action.payload); // Adds a new user to the array
    },
    updateUser: (state, action) => {
      console.log("Updating user:", action.payload);
      const { id, data } = action.payload;
      const userIndex = state.findIndex((user) => user.id === id);
      if (userIndex >= 0) {
        state[userIndex] = { ...state[userIndex], ...data }; // Update user details
      }
    },
    deleteUser: (state, action) => {
      console.log("Deleting user with ID:", action.payload);
      return state.filter((user) => user.id !== action.payload); // Remove user by ID
    },
    clearUsers: () => {
      console.log("Clearing all users");
      return []; // Reset state to an empty array
    },
  },
});

export const usersSliceActions = usersSlice.actions;

export default usersSlice;
