import { createSlice } from "@reduxjs/toolkit";

const rolesSlice = createSlice({
  name: "roles",
  initialState: [], // Roles array
  reducers: {
    initializeRoles: (state, action) => {
      console.log("Initializing roles with:", action.payload);
      return [...action.payload]; // Replace the state with the payload array
    },
    addRole: (state, action) => {
      console.log("Adding role:", action.payload);
      state.push(action.payload); // Adds a new role to the state
    },
    updateRole: (state, action) => {
      console.log("Updating role:", action.payload);
      const { name, data } = action.payload;
      const roleIndex = state.findIndex((role) => role.name === name);
      if (roleIndex >= 0) {
        state[roleIndex] = { ...state[roleIndex], ...data }; // Merge updated data
      }
    },
    deleteRole: (state, action) => {
      console.log("Deleting role with name:", action.payload);
      return state.filter((role) => role.name !== action.payload); // Remove role by name
    },
    clearRoles: () => {
      console.log("Clearing all roles");
      return []; // Reset state to an empty array
    },
  },
});

export const rolesSliceActions = rolesSlice.actions;

export default rolesSlice;
