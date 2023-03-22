import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '@/plugins/axios/index';

const baseUrl = process.env.REACT_APP_RAPID_API_URL;

export const information_fetchStatistic = createAsyncThunk(
  'information/fetchStatistic',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.get(`${baseUrl}/continents/Asia`, payload);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const informationSlice = createSlice({
  name: 'information',
  initialState: {
    loading: false,
    statisticData: {},
  },
  reducers: {},
  extraReducers: {
    [information_fetchStatistic.pending]: state => {
      state.loading = true;
    },
    [information_fetchStatistic.fulfilled]: state => {
      state.loading = false;
    },
    [information_fetchStatistic.rejected]: state => {
      state.loading = false;
    },
  },
});

export default informationSlice.reducer;
