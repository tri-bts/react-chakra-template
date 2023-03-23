import { createSlice } from '@reduxjs/toolkit';

const formUniqueSlice = createSlice({
  name: 'formUnique',
  isEdit: false,
  initialState: {
    formUnique_form: {
      id: '',
      type: '',
      label: '',
      maxLength: '',
      dataType: '',
    },
    formUnique_data: [],
  },
  reducers: {
    formUnique_setForm(state, { payload }) {
      state.formUnique_form = {
        ...state.formUnique_form,
        ...payload,
      };
    },
    formUnique_doSave(state, { payload }) {
      const value = { ...payload, id: new Date().valueOf() };
      state.formUnique_data = [...state.formUnique_data, value];
    },
    formUnique_doDelete(state, { payload }) {
      state.formUnique_data = state.formUnique_data.filter(function (item) {
        return item.id !== payload;
      });
      if (payload == state.formUnique_form.id) {
        state.isEdit = false;
        state.formUnique_form = {
          id: '',
          type: '',
          label: '',
          maxLength: '',
          dataType: '',
        };
      }
    },
    formUnique_doEdit(state, { payload }) {
      const data = [...state.formUnique_data];
      const foundId = data.findIndex(x => x.id === payload.id);
      data[foundId] = payload;
      state.formUnique_data = data;
      state.isEdit = false;
      state.formUnique_form = {
        id: '',
        type: '',
        label: '',
        maxLength: '',
        dataType: '',
      };
    },
    formUnique_edit(state, { payload }) {
      state.isEdit = true;
      state.formUnique_form = payload;
    },
    formUnique_reset(state) {
      state.isEdit = false;
      state.formUnique_form = {
        id: '',
        type: '',
        label: '',
        maxLength: '',
        dataType: '',
      };
    },
  },
});

export const {
  formUnique_setForm,
  formUnique_doDelete,
  formUnique_doSave,
  formUnique_doEdit,
  formUnique_edit,
  formUnique_reset,
} = formUniqueSlice.actions;

export default formUniqueSlice.reducer;
