import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { EVENTS } from '../constant/event.constant';

export const event_fetch = createAsyncThunk(
  'event/fetchEvent',
  async (payload, { rejectWithValue }) => {
    try {
      return EVENTS;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const eventSlice = createSlice({
  name: 'event',
  initialState: {
    events: [],
    event_loading: false,
  },
  reducers: {},
  extraReducers: {
    [event_fetch.pending]: state => {
      state.event_loading = true;
    },
    [event_fetch.rejected]: state => {
      state.event_loading = false;
    },
    [event_fetch.fulfilled]: (state, { payload }) => {
      state.event_loading = false;
      state.events = payload.EVENTS;
    },
  },
});

export default eventSlice.reducer;
