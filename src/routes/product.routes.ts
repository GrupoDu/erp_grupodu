import ProductController from "../controllers/product.controller.js";
import express, { type Request, type Response } from "express";
import ProductService from "../services/product.service.js";
import { prisma } from "../../lib/prisma.js";

const router = express.Router();
const productService = new ProductService(prisma);
const productController = new ProductController(productService);

router.get("/", (req: Request, res: Response) =>
  productController.getAllProductsData(req, res),
);

export default router;
