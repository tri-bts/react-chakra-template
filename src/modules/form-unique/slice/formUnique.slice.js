import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const formUnique_doSave = createAsyncThunk(
  'formUnique/save',
  async (payload, { rejectWithValue }) => {
    try {
      return payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const formUnique_doDelete = createAsyncThunk(
  'formUnique/delete',
  async (payload, { rejectWithValue }) => {
    try {
      return payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const formUnique_doEdit = createAsyncThunk(
  'formUnique/edit',
  async (payload, { rejectWithValue }) => {
    try {
      return payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const formUnique_edit = createAsyncThunk(
  'formUnique/setEdit',
  async (payload, { rejectWithValue }) => {
    try {
      return payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const formUnique_reset = createAsyncThunk(
  'formUnique/reset',
  async (payload, { rejectWithValue }) => {
    try {
      return payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

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
  },
  extraReducers: {
    [formUnique_doSave.fulfilled]: (state, { payload }) => {
      const value = { ...payload, id: new Date().valueOf() };
      state.formUnique_data = [...state.formUnique_data, value];
    },
    [formUnique_doDelete.fulfilled]: (state, { payload }) => {
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
    [formUnique_doEdit.fulfilled]: (state, { payload }) => {
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
    [formUnique_edit.fulfilled]: (state, { payload }) => {
      state.isEdit = true;
      state.formUnique_form = payload;
    },
    [formUnique_reset.fulfilled]: state => {
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

export const { formUnique_setForm } = formUniqueSlice.actions;

export default formUniqueSlice.reducer;
