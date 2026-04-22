export interface IProductionOrder {
  production_order_uuid: string;
  production_order_title: string;
  product_uuid: string;
  production_order_description?: string | null;
  delivery_observation?: string | null;
  created_at: Date;
  production_order_deadline: Date;
  production_order_status: string;
  product_quantity: number;
  delivered_at?: Date | null;
  cut_assistant?: string | null;
  fold_assistant?: string | null;
  finishing_assistant?: string | null;
  paint_assistant?: string | null;
  employee_uuid?: string | null;
  supervisor_uuid: string | null;
  delivered_product_quantity?: number;
  stock_validation?: boolean;
  order_uuid?: string | null;
}

/**
 * Campos omitidos na criação de ordem de produção
 * @see {IProductionOrder}
 */
type createOmitFields =
  | "production_order_uuid"
  | "created_at"
  | "delivered_product_quantity"
  | "stock_validation"
  | "delivered_at"

/**
 * @see {IProductionOrder}
 * @extends {IProductionOrder}
 * @Omit production_order_uuid, created_at, delivered_product_quantity, stock_validation, delivered_at
 */
export interface IProductionOrderCreate extends Omit<
  IProductionOrder,
  createOmitFields
> {
  delivered_product_quantity: number;
}

/**
 * @see {IProductionOrder}
 * @extends {IProductionOrder}
 * @Omit production_order_id
 */
export interface IProductionOrderUpdate extends Partial<
  Omit<IProductionOrder, "production_order_uuid">
> {}

/**
 * @see {IProductionOrder}
 * @extends {IProductionOrder}
 * @Pick production_order_id, delivered_product_quantity, product_quantity
 */
export interface IProductionOrderDeliver extends Pick<
  IProductionOrder,
  "production_order_uuid" & "delivered_product_quantity" & "product_quantity"
> {}

/**
 * @see {IProductionOrder}
 * @extends {IProductionOrder}
 * @Omit delivered_product_quantity, product_quantity
 */
export interface IProductionOrderTestType extends Omit<
  IProductionOrder,
  "delivered_product_quantity" | "product_quantity"
> {
  product_quantity: number;
  delivered_product_quantity: number;
}
