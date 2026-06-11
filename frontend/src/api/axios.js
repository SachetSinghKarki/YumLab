import axios from 'axios'

const backendUrl = import.meta.env.VITE_BACKEND_URL?.trim() || 'http://localhost:4000'

const api = axios.create({
  baseURL: backendUrl.replace(/\/$/, ''),
  withCredentials: true,
})

export default api
