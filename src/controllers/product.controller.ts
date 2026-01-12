import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";

class ProductController {
  async getAllProducts(req: Request, res: Response): Promise<Response> {
    try {
      const allProducts = await prisma.produtos.findMany({
        where: {
          product_type: "carro de mão",
        },
      });

      return res.status(200).json(allProducts);
    } catch (err) {
      return res.status(500).json({
        message: "Houve um erro de conexão",
        error: (err as Error).message,
      });
    }
  }
}

export default ProductController;