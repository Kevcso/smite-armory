import express from "express";
import * as godController from "../controllers/godController";
import { checkAdminAuth } from "../middleware/adminAuth";

const router = express.Router();

router.get("/", godController.getGods); // Public
router.get("/:id", godController.getGod); // Public
router.post("/", checkAdminAuth, godController.createGod); // Admin only
router.delete("/:id", checkAdminAuth, godController.removeGod); // Admin only

export default router;
