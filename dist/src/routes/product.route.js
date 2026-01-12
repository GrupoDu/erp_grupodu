import ProductController from "../controllers/product.controller.js";
import express from "express";
const router = express.Router();
router.get("/", new ProductController().getAllProducts);
export default router;
//# sourceMappingURL=product.route.js.map