import * as z from "zod";

export const DeliverProductionOrderSchema = z.object({
  delivered_product_quantity: z.number(),
  requested_product_quantity: z.number(),
});
