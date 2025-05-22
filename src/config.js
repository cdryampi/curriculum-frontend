export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const GLOBAL_DELAY_CALLBACK = parseInt(
  import.meta.env.VITE_GLOBAL_DELAY_CALLBACK || "1500",
  10
);
export const LOGIN_USER = import.meta.env.VITE_LOGIN_USER;
export const LOGIN_PASSWORD = import.meta.env.VITE_LOGIN_PASSWORD;
export const GIT_HUB_URL = import.meta.env.VITE_GIT_HUB_URL;

console.log("API BASE:", import.meta.env);
