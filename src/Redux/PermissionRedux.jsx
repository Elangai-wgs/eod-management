import { createSlice } from "@reduxjs/toolkit";

const permissionsSlice = createSlice({
  name: "permissions",
  initialState: {},
  reducers: {
    setPermission: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setPermission } = permissionsSlice.actions;

export default permissionsSlice.reducer;
