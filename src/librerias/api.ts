import axios from "axios";
import { almacenamiento } from "./almacenamiento";

function obtenerBaseApi() {
  const baseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";
  const normalizedBaseUrl = baseUrl.trim().replace(/\/+$/, "");

  return normalizedBaseUrl.endsWith("/api") ? normalizedBaseUrl : `${normalizedBaseUrl}/api`;
}

export const api = axios.create({
  baseURL: obtenerBaseApi(),
  timeout: 30000,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = almacenamiento.obtenerToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      almacenamiento.borrarToken();
      if (window.location.pathname !== "/login") {
        window.location.assign("/login");
      }
    }
    return Promise.reject(error);
  }
);

export function extraerDatos<T>(respuesta: { data: T | { data?: T; user?: T } }): T {
  const payload = respuesta.data as T | { data?: T; user?: T };
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as { data?: T }).data as T;
  }
  if (payload && typeof payload === "object" && "user" in payload && !("accessToken" in payload)) {
    return (payload as { user: T }).user;
  }
  return payload as T;
}
