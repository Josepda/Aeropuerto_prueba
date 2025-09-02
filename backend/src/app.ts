import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import airportRoutes from "./routes/airport.routes";
import routeRoutes from "./routes/route.routes";

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/airports", airportRoutes);
app.use("/api/routes", routeRoutes);

// health
app.get("/health", (_req, res) => res.json({ ok: true }));

export default app;
