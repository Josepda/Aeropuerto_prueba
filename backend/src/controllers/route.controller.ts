import { Request, Response } from "express";
import Route from "../models/Route";

export const listRoutes = async (req: Request, res: Response) => {
  const routes = await Route.find().populate("id_aeropuerto_origen id_aeropuerto_destino");
  res.json({ data: routes, total: routes.length });
};

export const getRoute = async (req: Request, res: Response) => {
  const route = await Route.findById(req.params.id).populate("id_aeropuerto_origen id_aeropuerto_destino");
  if (!route) return res.status(404).json({ message: "No encontrado" });
  res.json(route);
};

export const createRoute = async (req: Request, res: Response) => {
  try {
    const route = new Route(req.body);
    await route.save();
    res.status(201).json(route);
  } catch (error: any) {
    res.status(400).json({ error: error.message ?? error });
  }
};

export const updateRoute = async (req: Request, res: Response) => {
  const route = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!route) return res.status(404).json({ message: "No encontrado" });
  res.json(route);
};

export const deleteRoute = async (req: Request, res: Response) => {
  await Route.findByIdAndDelete(req.params.id);
  res.json({ message: "Eliminado" });
};
