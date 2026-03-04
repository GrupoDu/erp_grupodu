import type { Decimal } from "@prisma/client/runtime/wasm-compiler-edge";
import type { Prisma } from "../../generated/prisma/client.js";

export interface IProduct {
  uuid: string;
  name: string;
  description: string;
  product_type: string;
  created_at: Date;
  image: string;
  features?: string[];
  acronym?: string | null;
  composition?: Prisma.JsonValue;
  stock_quantity?: Decimal;
}

export interface IProductCreate extends Omit<IProduct, "composition"> {
  composition?: Prisma.InputJsonValue;
}

export interface IProductUpdate extends Partial<
  Omit<IProduct, "composition" | "uuid" | "created_at">
> {
  composition?: Prisma.InputJsonValue;
}
