import axios from "axios";

const defaultTokenKey = "todo_token";
const defaultIsAdminKey = "isAdmin";
const axiosInstance = axios.create()


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("todo_token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    console.log("Bad Request!");
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.token) {
      localStorage.setItem(`${defaultTokenKey}`, response.data.token);
    }
    const isAdmin = response.data.isAdmin
    if ((typeof isAdmin) ===(typeof true)){
        localStorage.setItem(`${defaultIsAdminKey}`, String(response.data.isAdmin));
    }
    return response;
  },
  (error) => {
    console.log("Bad Response!");
    return Promise.reject(error);
  }
);

export default axiosInstance;
