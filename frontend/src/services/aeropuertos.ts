
import { api } from "./api"

export interface Aeropuerto {
  _id?: string
  name: string
  code: string
  city?: string
  country?: string
  timezone?: string
  status?: "open" | "closed" | "maintenance"
  createdAt?: string
  updatedAt?: string
}

export const Aeropuertos = {
  list: (q = "", page = 1, limit = 1000) =>
    api.get<Aeropuerto[]>(`/api/airports?q=${encodeURIComponent(q)}&page=${page}&limit=${limit}`),
  get: (id: string) => api.get<Aeropuerto>(`/api/airports/${id}`),
  create: (data: Aeropuerto) => api.post<Aeropuerto>(`/api/airports`, data),
  update: (id: string, data: Aeropuerto) => api.patch<Aeropuerto>(`/api/airports/${id}`, data),
  remove: (id: string) => api.delete<{ message: string }>(`/api/airports/${id}`),
}
