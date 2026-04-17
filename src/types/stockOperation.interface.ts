import type { IStockUpdates } from "./stockUpdates.interface.js";

export interface IStockOperationCreate {
  production_order_uuid: string;
  product_quantity_title: string;
  event: string;
  inStockIncrementQuantity: number;
  producedQuantity: number;
  product_uuid: string;
  validation: boolean;
}

export interface IStockOperationResult {
  stockUpdate: IStockUpdates;
  productionValidation: string;
  stockIncrement: string;
}
