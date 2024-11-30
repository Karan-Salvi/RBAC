import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "Unloggedin User",
    email: "Unlogged@gmail.com",
    avatar: "/images/default1.png",
    role: "unloggeduser",
    mainInterest: [],
    skills: [],
    description: "",
    _id: "",
  },
  reducers: {
    addUser: (state, action) => {
      console.log("The action payload is:", action.payload);

      // Replace state with action payload
      return { ...state, ...action.payload };
    },
  },
});

export const userSliceActions = userSlice.actions;

export default userSlice;