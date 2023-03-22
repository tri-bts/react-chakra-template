import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'family',
  initialState: {
    family_treeData: [{}],
  },
  reducers: {
    family_clearState(state) {
      state.family_treeData = [{}];
    },
    family_updateTree(state, action) {
      state.family_treeData = action.payload?.length ? action.payload : [{}];
    },
  },
});

export const { family_clearState, family_updateTree } = authSlice.actions;

export default authSlice.reducer;
