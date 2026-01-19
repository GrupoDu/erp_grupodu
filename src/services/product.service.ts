import type { Request, Response } from "express";
import type { IProduct } from "../types/models.interface.js";
import { prisma } from "../../lib/prisma.js";
import type { Prisma } from "@prisma/client";
import type {
  IProductCreate,
  IProductUpdate,
} from "../types/product.interface.js";

class ProductService {
  async getAllProductsData(): Promise<IProduct[] | string> {
    try {
      const allProducts: IProduct[] = await prisma.products.findMany();

      return allProducts;
    } catch (err) {
      return (err as Error).message;
    }
  }

  async registerNewProduct(
    newProductData: IProductCreate
  ): Promise<IProduct | string> {
    try {
      const { name, description, product_type, image } = newProductData;

      if (!name || !description || !product_type || !image) {
        return "Preencha todos os campos.";
      }

      const newProduct: IProduct = await prisma.products.create({
        data: newProductData,
      });

      return newProduct;
    } catch (err) {
      return (err as Error).message;
    }
  }

  async updateProductData(
    productNewData: IProductUpdate,
    productUuid: string
  ): Promise<IProduct | string> {
    try {
      const updatedProduct: IProduct = await prisma.products.update({
        where: {
          uuid: productUuid as string,
        },
        data: productNewData,
      });

      return updatedProduct;
    } catch (err) {
      return (err as Error).message;
    }
  }
}
