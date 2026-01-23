import express from "express";
import RegisterAnalysisService from "../services/registersAnalysis.service.js";
import { prisma } from "../../lib/prisma.js";
import RegisterAnalysisController from "../controllers/registerAnalysis.controller.js";
import { dataAnalysisAuthorizationMiddleware } from "../middlewares/dataAnalysisAuthorization.middleware.js";

const router = express.Router();
const registerAnalysisService = new RegisterAnalysisService(prisma);
const registerAnalysisController = new RegisterAnalysisController(
  registerAnalysisService,
);

router.get(
  "/",
  dataAnalysisAuthorizationMiddleware,
  registerAnalysisController.getRegistersDataAnalysis,
);

export default router;
