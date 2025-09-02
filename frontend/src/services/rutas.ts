import { api } from "./api"

export interface Ruta {
  id_ruta?: number
  id_aeropuerto_origen: string | number
  id_aeropuerto_destino: string | number
  cantidad_km: number
  precio: number
}


