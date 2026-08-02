// src/api/index.js
import axios from "axios";

import { API_BASE_URL } from "../config";
import { getStoredLanguage } from "../i18n/languages";

// Configura el cliente de Axios
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  config.headers["Accept-Language"] = getStoredLanguage();
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Timeout de red: mensaje claro en lugar del error técnico de Axios.
    if (error.code === "ECONNABORTED" || error.message === "Network Error") {
      const timeoutError = new Error(
        "No se pudo conectar con el servidor. Comprueba tu conexión e inténtalo de nuevo."
      );
      timeoutError.name = "NetworkError";
      return Promise.reject(timeoutError);
    }
    return Promise.reject(error);
  }
);

// Funciones para diferentes endpoints
export const fetchStaticPages = () => apiClient.get(`/static_pages/private/`);
export const fetchSocialLinks = () => apiClient.get("/social/private/");
export const fetchUserProfile = () =>
  apiClient.get("/base/userprofile/private/");
export const fetchStaticPage = (slug) =>
  apiClient.get(`/static_pages/${slug}/`);
export const fetchSkills = () =>
  apiClient.get(`/education_and_skills/skill_list/`); // no se usa en el proyecto pero no molesta tenerlo
export const fetchEducationList = () =>
  apiClient.get(`/education_and_skills/education_list_private/`);
export const fetchLaboralExperience = () =>
  apiClient.get(`/laboral_experience/laboral_experience_list_private/`);

export const fetchSkillFilter = (slug) =>
  apiClient.get(`/education_and_skills/skill_list_category/${slug}/`);
export const fetchSkillFilterNextPrev = (url) => apiClient.get(url);
export const fetchPortfolioList = () => apiClient.get("/portfolio/private/");
export const fetchServicesList = () => apiClient.get("/services/private/");
export const sendEmailService = (name, email, message) =>
  apiClient.post("/email_service/enviar-correo/", { name, email, message }); // endpoint público con throttle; no requiere CSRF ni token.
export const fetchUserPDF = () => apiClient.get("/base/userprofile/pdf/");
