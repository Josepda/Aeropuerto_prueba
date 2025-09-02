import { api } from "./api";

export const Auth = {
  login: (email: string, password: string) => api.post<{ token: string }>("/api/auth/login", { email, password }),
  register: (email: string, password: string, role = "admin") => api.post("/api/auth/register", { email, password, role })
}
