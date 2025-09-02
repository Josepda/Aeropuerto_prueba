export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
  const headers: Record<string,string> = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    headers,
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: any) => request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  put:  <T>(path: string, body: any) => request<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  patch:<T>(path: string, body: any) => request<T>(path, { method: "PATCH", body: JSON.stringify(body) }),
  delete:<T>(path: string) => request<T>(path, { method: "DELETE" }),
}
