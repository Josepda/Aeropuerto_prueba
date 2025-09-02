import { Router } from "express";
import { listRoutes, createRoute, getRoute, updateRoute, deleteRoute } from "../controllers/route.controller";
import { verifyToken } from "../middleware/auth";

const router = Router();

router.get("/", verifyToken, listRoutes);
router.post("/", verifyToken, createRoute);
router.get("/:id", verifyToken, getRoute);
router.patch("/:id", verifyToken, updateRoute);
router.delete("/:id", verifyToken, deleteRoute);

export default router;
