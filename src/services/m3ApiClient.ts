import axios from "axios";

const m3ApiClient = axios.create({
  baseURL: import.meta.env.VITE_M3_API_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },

  validateStatus(status) {
    return status < 500;
  },
});

export default m3ApiClient;