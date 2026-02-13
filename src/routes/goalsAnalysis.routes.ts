import express from "express";
import type { Request, Response } from "express";
import GoalsAnalysisController from "../controllers/goalsAnalysis.controller.js";
import GoalsAnalysisService from "../services/goalsAnalysis.service.js";
import { prisma } from "../../lib/prisma.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();
const goalsAnalysisService = new GoalsAnalysisService(prisma);
const goalsAnalysisController = new GoalsAnalysisController(
  goalsAnalysisService,
);

router.get("/", (req: Request, res: Response) =>
  goalsAnalysisController.getGoalsAnalysis(req, res),
);

export default router;
