import express, { type Request, type Response } from "express";
import ProductionDataAnalysisController from "../controllers/productionDataAnalysis.controller.js";

const router = express.Router();

router.get("/month", (req: Request, res: Response) =>
  new ProductionDataAnalysisController().productionAnalysisByMonth(req, res)
);
router.get("/week", (req: Request, res: Response) =>
  new ProductionDataAnalysisController().productionAnalysisByWeek(req, res)
);
router.get("/year", (req: Request, res: Response) =>
  new ProductionDataAnalysisController().productionAnalysisByYear(req, res)
);

export default router;
