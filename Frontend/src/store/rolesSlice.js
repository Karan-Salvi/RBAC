import { createSlice } from "@reduxjs/toolkit";

const rolesSlice = createSlice({
  name: "roles",
  initialState: [], // Roles array
  reducers: {
    initializeRoles: (state, action) => {
      return [...action.payload];
    },
    addRole: (state, action) => {
      state.push(action.payload);
    },
    updateRole: (state, action) => {
      const { name, data } = action.payload;
      const roleIndex = state.findIndex((role) => role.name === name);
      if (roleIndex >= 0) {
        state[roleIndex] = { ...state[roleIndex], ...data };
      }
    },
    deleteRole: (state, action) => {
      return state.filter((role) => role._id !== action.payload);
    },
    clearRoles: () => {
      return []; // Reset state to an empty array
    },
  },
});

export const rolesSliceActions = rolesSlice.actions;

export default rolesSlice;
