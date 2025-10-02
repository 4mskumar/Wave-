import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
axios.defaults.headers.common["Content-Type"] = "application/json";

export default axios;