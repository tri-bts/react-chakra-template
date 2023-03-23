import { createSlice } from '@reduxjs/toolkit';
import { formula_delete, formula_edit, formula_save } from '@/modules/formula/redux/formula.thunk';

const formulaSlice = createSlice({
  name: 'formulaSlice',
  initialState: {
    formula_data: [],
    formula_dialog: {
      isOpen: false,
      label: '',
      formula: '',
    },
  },
  reducers: {
    formula_addData: (state, { payload }) => {
      state.formula_data.push({ ...payload, id: new Date().valueOf() });
    },
    formula_setDialog: (state, { payload }) => {
      state.formula_dialog = payload;
    },
  },
  extraReducers: {
    [formula_save.fulfilled]: (state, { payload }) => {
      state.formula_data.push({ ...payload, id: new Date().valueOf() });
    },
    [formula_edit.fulfilled]: (state, { payload }) => {
      state.formula_data = state.formula_data.map(data => {
        if (data.id === payload.id) return payload;

        return data;
      });
    },
    [formula_delete.fulfilled]: (state, { payload }) => {
      state.formula_data = state.formula_data.filter(data => data.id !== payload.id);
    },
  },
});

export const { formula_addData, formula_setDialog } = formulaSlice.actions;
export default formulaSlice.reducer;
