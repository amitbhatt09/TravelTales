// src/apiConfig.js
//const baseUrl = import.meta.env.VITE_API_BASE_URL;
const baseUrl = process.env.REACT_APP_API_BASE_URL; 

if (!baseUrl) {
  console.error("❌ VITE_API_BASE_URL is undefined");
}

export default baseUrl;
