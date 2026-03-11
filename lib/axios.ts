import axios from "axios";

/*
 * Axios instance configured for the YohPal-Hustle firbase API.
 */
const firebaseClient = axios.create({
  // This is the BASE for all Firebase Auth REST operations
  baseURL: "https://identitytoolkit.googleapis.com/v1", 
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
// ─── Request Interceptor ───
firebaseClient.interceptors.request.use(
  (config) => {
    // Attach auth token if available (e.g. from localStorage or a cookie)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ──
firebaseClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling: log unexpected server errors
    if (error.response?.status === 401) {
      // Optionally redirect to login on unauthorized
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default firebaseClient;
