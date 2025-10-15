import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("admin_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

export const endpoints = {
  auth: {
    login: "/admin/login",
    verify: "/admin/verify",
  },
  stats: {
    overview: "/admin/stats",
    charts: "/admin/charts",
    activity: "/admin/activity",
  },
  users: {
    list: "/admin/users",
    detail: (id: string) => `/admin/users/${id}`,
  },
};