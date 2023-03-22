import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../../plugins/axios';

export const authLogin = createAsyncThunk(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.post(
        'http://localhost:4000/login',
        payload
      );
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: !!localStorage.getItem('token'),
    loading: false,
    token: null,
  },
  reducers: {
    authClearState(state) {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
  extraReducers: {
    [authLogin.pending]: state => {
      state.loading = true;
    },
    [authLogin.fulfilled]: state => {
      state.loading = false;
      state.isLoggedIn = true;
      state.token = 'CONTOH TOKEN';
    },
    [authLogin.rejected]: state => {
      state.loading = false;
    },
  },
});

export const { authClearState } = authSlice.actions;

export default authSlice.reducer;
