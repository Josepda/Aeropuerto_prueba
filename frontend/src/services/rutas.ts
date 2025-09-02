import { api } from "./api"

export interface Ruta {
  id_ruta?: number
  id_aeropuerto_origen: string | number
  id_aeropuerto_destino: string | number
  cantidad_km: number
  precio: number
}

export interface Paged<T> {
  data: T[]
  total: number
}

export const Rutas = {
  list: (q = "", page = 1, limit = 10) =>
    api.get<Paged<Ruta>>(`/api/routes?q=${encodeURIComponent(q)}&page=${page}&limit=${limit}`),
  get: (id: number) => api.get<Ruta>(`/api/routes/${id}`),
  create: (data: Ruta) => api.post<Ruta>("/api/routes", data),
  update: (id: number, data: Ruta) => api.put<Ruta>(`/api/routes/${id}`, data),
  remove: (id: number) => api.delete<{ success: boolean }>(`/api/routes/${id}`),
}
