# Aeropuertos Frontend Pro (React + Tailwind)

UI profesional para tu proyecto de **Aeropuertos** y **Rutas**.
Incluye dashboard, tablas, formularios con validación y arquitectura limpia.

## Stack
- Vite + React + TypeScript
- TailwindCSS (estilo moderno, esquinas 2xl, sombras suaves)
- Componentes UI inspirados en shadcn (sin CLI)
- react-hook-form + zod (validación)
- react-router-dom (rutas)
- Servicios `fetch` con `VITE_API_URL`

## Instalación
```bash
npm i
cp .env.example .env
# edita .env para apuntar a tu backend (por ejemplo http://localhost:3000)
npm run dev
```

## Endpoints esperados
- **Aeropuertos**
  - `GET /aeropuertos?q=&page=&limit=` → `{ data: Aeropuerto[], total: number }`
  - `GET /aeropuertos/:id` → `Aeropuerto`
  - `POST /aeropuertos` (body `Aeropuerto`)
  - `PUT /aeropuertos/:id` (body `Aeropuerto`)
  - `DELETE /aeropuertos/:id`
- **Rutas**
  - `GET /rutas?q=&page=&limit=` → `{ data: Ruta[], total: number }`
  - `GET /rutas/:id` → `Ruta`
  - `POST /rutas`
  - `PUT /rutas/:id`
  - `DELETE /rutas/:id`

> Si tu backend usa otros nombres de campos o rutas, ajusta `src/services/*.ts`.

## Diseño
- Layout con sidebar, botones redondeados 2xl, tarjetas, tabla responsive.
- Formularios limpios, mensajes de error y modo **ver** (`?view=1`).

## Personalización rápida
- Cambia colores en `tailwind.config.js`
- Componentes reutilizables en `src/components/ui`
- Servicios HTTP en `src/services`

¡Listo para conectar con tu backend y verse **pro**!
