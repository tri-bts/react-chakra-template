import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;
const RAPID_API_KEY = process.env.REACT_APP_RAPID_API_KEY;
const RAPID_API_HOST = process.env.REACT_APP_RAPID_API_HOST;

let store;
export const httpInjectStore = s => (store = s);

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

axiosClient.interceptors.request.use(
  config => {
    config.headers = {
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': RAPID_API_HOST,
    };

    const auth = store.getState().auth;
    if (auth.auth_isLoggedIn) {
      config.headers['Authorization'] = `Bearer ${auth.auth_token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (!error.response) {
      console.log('Please check your internet connection.');
    }
    throw error;
  }
);

export default axiosClient;
