import { response, type Request, type Response } from "express";
import { prisma } from "../../lib/prisma.js";
import type { IProduct } from "../types/models.interface.js";
import { responseMessages } from "../constants/messages.constants.js";

class ProductController {
  async getAllProductsData(req: Request, res: Response): Promise<Response> {
    try {
      const searchByProductType = {
        where: {
          product_type: "carro de mão",
        },
      };

      const allProducts: IProduct[] = await prisma.products.findMany(
        searchByProductType
      );

      return res.status(200).json(allProducts);
    } catch (err) {
      return res.status(500).json({
        message: responseMessages.catchErrorMessage,
        error: (err as Error).message,
      });
    }
  }

  async registerProduct(req: Request, res: Response): Promise<Response> {
    try {
      const productInfos = req.body;

      if (
        !productInfos.name ||
        !productInfos.description ||
        !productInfos.product_type ||
        !productInfos.image
      ) {
        return res
          .status(422)
          .json({ message: responseMessages.fillAllFieldMessage });
      }

      const newProduct: IProduct = await prisma.products.create({
        data: {
          name: productInfos.name,
          description: productInfos.description,
          product_type: productInfos.product_type,
          image: productInfos.image,
          features: productInfos.features,
          acronym: productInfos.acronym,
          composition: productInfos.composition,
        },
      });

      return res
        .status(201)
        .json({ message: "Produto registrado com sucesso.", data: newProduct });
    } catch (err) {
      return res.status(500).json({
        message: responseMessages.catchErrorMessage,
        error: (err as Error).message,
      });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<Response> {
    try {
      const { uuid } = req.params;

      if (!uuid)
        return res
          .status(422)
          .json({ message: responseMessages.fillAllFieldMessage });

      const productToBeDeleted = {
        where: {
          uuid: uuid as string,
        },
      };

      await prisma.products.delete(productToBeDeleted);

      return res.status(200).json({ message: "Produto removido com sucesso." });
    } catch (err) {
      return res.status(500).json({
        message: responseMessages.catchErrorMessage,
        error: (err as Error).message,
      });
    }
  }

  async updateProductData(req: Request, res: Response): Promise<Response> {
    try {
      const { productNewInfos } = req.body;
      const { uuid } = req.params;

      if (!productNewInfos || !uuid) {
        return res
          .status(422)
          .json({ message: responseMessages.fillAllFieldMessage });
      }

      const productToBeUpdated = {
        data: productNewInfos,
        where: {
          uuid: uuid as string,
        },
      };

      const updatedProduct = await prisma.products.update(productToBeUpdated);

      return res.status(200).json({
        message: "Produto atualizado com sucesso.",
        updated: updatedProduct,
      });
    } catch (err) {
      return res.status(500).json({
        message: responseMessages.catchErrorMessage,
        error: (err as Error).message,
      });
    }
  }
}

export default ProductController;
