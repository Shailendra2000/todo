import { createSlice } from "@reduxjs/toolkit";

const statusListSlice = createSlice({
  name: "statusList",
  initialState: {
    value: [],
  },
  reducers: {
    setStatusList: (state, action) => {
      state.value = action.payload;
    },
    removeStatus: (state, action) => {
      state.value.splice(action.payload, 1);
    },
    addStatus: (state, action) => {
      state.value.splice(action.payload.index, 0, action.payload.item);
    },
  },
});

export const { setStatusList, addStatus, removeStatus } =
  statusListSlice.actions;
export default statusListSlice.reducer;
