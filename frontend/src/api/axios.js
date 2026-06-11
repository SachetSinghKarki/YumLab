import axios from 'axios'

const backendUrl = import.meta.env.VITE_BACKEND_URL?.trim() || 'http://localhost:4000'

const api = axios.create({
  baseURL: backendUrl.replace(/\/$/, ''),
  withCredentials: false,
})

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  if (user?.token && user.token.length < 2000) {
    config.headers.Authorization = `Bearer ${user.token}`
  }

  return config
})

export default api
