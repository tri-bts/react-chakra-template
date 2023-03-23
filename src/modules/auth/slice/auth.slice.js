import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AUTH_ROLE_PERMISSIONS, AUTH_USERS } from '../constant/auth.constant';

export const auth_doLogin = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const { username, password } = payload;

    // Validate user
    const user = AUTH_USERS.find(u => u.username === username);
    if (!user) {
      throw new Error('Akun tidak terdaftar');
    }

    // Validate password
    if (user.password !== password) {
      throw new Error('ID / Password Salah');
    }

    // Check user have roles
    if (!user.roles.length) {
      throw new Error('Akun Belum memiliki peran');
    }

    return user;
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
    auth_roles: [],
    auth_token: null,
  },
  reducers: {
    auth_clearState(state) {
      state.auth_isLoggedIn = false;
      state.auth_permissions = [];
      state.auth_fullName = '';
      state.auth_menus = [];
      state.auth_token = null;
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
      state.auth_roles = payload.roles;
      state.auth_token = '@tokenauthberarer';
    },
  },
});

export const { auth_clearState } = authSlice.actions;

export default authSlice.reducer;
