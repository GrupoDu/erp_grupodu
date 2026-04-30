import ProductController from "../controllers/product.controller.js";
import { Router, type Request, type Response } from "express";
import ProductService from "../services/product.service.js";
import { prisma } from "../../lib/prisma.js";
import { adminAuthMiddleware } from "../middlewares/adminAuth.middleware.js";
import { getTokenMiddleware } from "../middlewares/getToken.middleware.js";
const router: Router = Router();
const productService = new ProductService(prisma);
const productController = new ProductController(productService);

router.get("/", getTokenMiddleware, (req: Request, res: Response) =>
  productController.getAllProductsData(req, res),
);
router.post(
  "/",
  getTokenMiddleware,
  adminAuthMiddleware,
  (req: Request, res: Response) => productController.registerProduct(req, res),
);
router.get(
  "/:product_uuid",
  getTokenMiddleware,
  (req: Request, res: Response) => productController.getProductById(req, res),
);
router.patch(
  "/:product_uuid",
  getTokenMiddleware,
  (req: Request, res: Response) =>
    productController.updateProductData(req, res),
);
router.delete(
  "/:product_uuid",
  getTokenMiddleware,
  adminAuthMiddleware,
  (req: Request, res: Response) => productController.deleteProduct(req, res),
);

export default router;
