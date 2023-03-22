import { createSlice } from '@reduxjs/toolkit';

const formAdvanceSlice = createSlice({
  name: 'formAdvance',
  initialState: {
    formAdvance_form: {
      name: '',
      age: '',
      maritalStatus: '',
      address: '',
      work: '',
      summaryLife: '',
      photo: '',
    },
  },
  reducers: {
    formAdvance_setForm(state, { payload }) {
      state.formAdvance_form = {
        ...state.formAdvance_form,
        ...payload,
      };
    },
  },
});

export const { formAdvance_setForm } = formAdvanceSlice.actions;

export default formAdvanceSlice.reducer;
