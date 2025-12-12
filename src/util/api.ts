
import axios, { AxiosError } from "axios";
import { routes } from "@/constants/routes";

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});




api.interceptors.request.use(
  (config) => {
  
    return config;
  },
  (error) => Promise.reject(error)
);




api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    

    if (!error.response) return Promise.reject(error);

    const status = error.response.status;

    if (status === 401 || status === 403) {

      if (typeof window !== "undefined") {
        window.location.href = routes.login;
      }

      return Promise.reject(error);
    }




    return Promise.reject(error);
  }
);

export default api;
