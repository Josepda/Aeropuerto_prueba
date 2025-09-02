import { Router } from "express";
import { getAirports, createAirport, getAirport, updateAirport, deleteAirport } from "../controllers/airport.controller";
import { verifyToken } from "../middleware/auth";

const router = Router();

router.get("/", verifyToken, getAirports);
router.post("/", verifyToken, createAirport);
router.get("/:id", verifyToken, getAirport);
router.patch("/:id", verifyToken, updateAirport);
router.delete("/:id", verifyToken, deleteAirport);

export default router;
