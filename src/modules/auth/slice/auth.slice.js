import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AUTH_ROLE_PERMISSIONS, AUTH_USER } from '../constant/auth.constant';

export const auth_doLogin = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const { username, password } = payload;

    // Check user is registered
    if (!Object.keys(AUTH_USER).includes(username)) {
      throw new Error('Akun tidak terdaftar');
    }

    // Get current user
    const currentUser = AUTH_USER[username];

    // Validate user and password
    if (currentUser.password !== password) {
      throw new Error('ID / Password Salah');
    }

    // Check user have roles
    if (!currentUser.roles.length) {
      throw new Error('Akun Belum memiliki peran');
    }

    return currentUser;
  } catch (err) {
    return rejectWithValue(err);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auth_isLoggedIn: false,
    auth_loading: false,
    auth_permissions: [],
    auth_fullName: '',
  },
  reducers: {
    auth_clearState(state) {
      state.auth_isLoggedIn = false;
      state.auth_permissions = [];
      state.auth_fullName = '';
    },
  },
  extraReducers: {
    [auth_doLogin.pending]: state => {
      state.auth_loading = true;
    },
    [auth_doLogin.rejected]: state => {
      state.auth_loading = false;
    },
    [auth_doLogin.fulfilled]: (state, { payload }) => {
      state.auth_loading = false;
      state.auth_isLoggedIn = true;
      state.auth_fullName = payload.fullName;
      state.auth_permissions = payload.roles.reduce((acc, role) => {
        acc.push(...AUTH_ROLE_PERMISSIONS[role]);
        return acc;
      }, []);
    },
  },
});

export const { auth_clearState } = authSlice.actions;

export default authSlice.reducer;
