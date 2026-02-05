import express from "express";
import { type Request, type Response } from "express";
import RegisterAnalysisService from "../services/registersAnalysis.service.js";
import { prisma } from "../../lib/prisma.js";
import RegisterAnalysisController from "../controllers/registerAnalysis.controller.js";
import { dataAnalysisAuthorizationMiddleware } from "../middlewares/dataAnalysisAuthorization.middleware.js";
import { adminAuthMiddleware } from "../middlewares/adminAuth.middleware.js";

const router = express.Router();
const registerAnalysisService = new RegisterAnalysisService(prisma);
const registerAnalysisController = new RegisterAnalysisController(
  registerAnalysisService,
);

router.get(
  "/",
  adminAuthMiddleware,
  (req: Request, res: Response) =>
    registerAnalysisController.getRegistersDataAnalysis(req, res),
);

export default router;
