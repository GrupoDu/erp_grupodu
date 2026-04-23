import * as z from "zod";

export const StockOperationSchema = z.object({
  production_order_uuid: z.string(),
  product_quantity_title: z.string(),
  event: z.string(),
  inStockIncrementQuantity: z.number(),
  product_uuid: z.string(),
  validation: z.boolean(),
  producedQuantity: z.number(),
});
