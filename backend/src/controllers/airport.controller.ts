import { Request, Response } from "express";
import Airport from "../models/Airport";

export const getAirports = async (_: Request, res: Response) => {
  const airports = await Airport.find();
  res.json(airports);
};

export const createAirport = async (req: Request, res: Response) => {
  try {
    const airport = new Airport(req.body);
    await airport.save();
    res.status(201).json(airport);
  } catch (error: any) {
    if (error.code === 11000) return res.status(400).json({ message: "Código de aeropuerto ya existe" });
    res.status(400).json({ error: error.message ?? error });
  }
};

export const getAirport = async (req: Request, res: Response) => {
  const airport = await Airport.findById(req.params.id);
  if (!airport) return res.status(404).json({ message: "No encontrado" });
  res.json(airport);
};

export const updateAirport = async (req: Request, res: Response) => {
  const airport = await Airport.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!airport) return res.status(404).json({ message: "No encontrado" });
  res.json(airport);
};

export const deleteAirport = async (req: Request, res: Response) => {
  await Airport.findByIdAndDelete(req.params.id);
  res.json({ message: "Eliminado" });
};
