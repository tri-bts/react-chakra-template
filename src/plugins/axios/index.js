import axios from "axios";

export const BASE_URL = process.env.REACT_APP_API_URL;

const axiosClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: BASE_URL,
  timeout: 10000,
});

axiosClient.interceptors.request.use(
  (set) => {

    // TODO check auth token
    // if (isAuthenticated) {
    //   set.headers = {
    //     Authorization: `Bearer ${useAuth.token}`,
    //   };
    // }

    return set;
  },
  (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (!error.response) {
      console.log("Please check your internet connection.");
    }
    throw error;
  },
);

export default axiosClient;
