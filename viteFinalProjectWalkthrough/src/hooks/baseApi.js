import axios from "axios";
console.log(import.meta.env.VITE_API_URL);
export const baseApi = axios.create({ baseURL: import.meta.env.VITE_API_URL });
