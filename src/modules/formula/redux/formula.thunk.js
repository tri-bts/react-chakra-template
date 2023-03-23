import { createAsyncThunk } from '@reduxjs/toolkit';

export const formula_save = createAsyncThunk(
  'formula/save',
  async (payload, { rejectWithValue }) => {
    try {
      return payload;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const formula_edit = createAsyncThunk(
  'formula/edit',
  async (payload, { rejectWithValue }) => {
    try {
      return payload;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const formula_delete = createAsyncThunk(
  'formula/delete',
  async (payload, { rejectWithValue }) => {
    try {
      return payload;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
