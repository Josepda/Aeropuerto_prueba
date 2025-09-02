# Aeropuertos Backend (Node + Express + MongoDB)

## Requisitos
- Node.js 18+
- npm
- MongoDB local o Atlas

## Pasos rápidos
1. Copia `.env.example` a `.env` y ajusta `MONGO_URI`.
2. Instala dependencias: `npm install`
3. Inicia el servidor: `npm run dev`
4. Endpoints:
   - POST /api/auth/register { email, password, role }
   - POST /api/auth/login { email, password } -> { token }
   - GET /api/airports (Authorization: Bearer <token>)
