// src/api/index.js
import axios from "axios";

import { API_BASE_URL } from "../config";
import loginhook from "../hooks/loginHook";

// Configura el cliente de Axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await loginhook();
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Funciones para diferentes endpoints
export const fetchStaticPages = () => apiClient.get(`/static_pages/`);
// export const fetchUserProfile = (userId) => apiClient.get(`/user_profiles/${userId}/`);
export const fetchFooterLinks = () => apiClient.get("/footer_links/");
export const fetchSocialLinks = () => apiClient.get("/social/social/");
export const fetchUserProfile = () =>
  apiClient.get("/base/userprofile/private/");
export const fetchStaticPage = (slug) =>
  apiClient.get(`/static_pages/${slug}/`);
export const fetchSkills = () =>
  apiClient.get(`/education_and_skills/skill_list/`);
export const fetchEducationList = () =>
  apiClient.get(`/education_and_skills/education_list/`);
export const fetchLaboralExperience = () =>
  apiClient.get(`/laboral_experience/laboral_experience_list/`);

export const fetchSkillFilter = (slug) =>
  apiClient.get(`/education_and_skills/skill_list_category/${slug}/`);
export const fetchSkillFilterNextPrev = (url) => apiClient.get(url);
