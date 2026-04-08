import { Router, type Request, type Response } from "express";
import InOutStockController from "../controllers/inoutStock.controller.js";
import InOutStockService from "../services/inoutStock.service.js";
import { prisma } from "../../lib/prisma.js";
import { getTokenMiddleware } from "../middlewares/getToken.middleware.js";

const router: Router = Router();
const inoutStockService = new InOutStockService(prisma);
const inoutStockController = new InOutStockController(inoutStockService);

router.get("/", getTokenMiddleware, (req: Request, res: Response) =>
  inoutStockController.getInOutStockAnalysis(req, res),
);
router.post(
  "/increment-in-stock",
  getTokenMiddleware,
  (req: Request, res: Response) =>
    inoutStockController.incrementMonthlyInStockQuantity(req, res),
);
router.post(
  "/increment-out-stock",
  getTokenMiddleware,
  (req: Request, res: Response) =>
    inoutStockController.incrementMonthlyOutStockQuantity(req, res),
);

export default router;
