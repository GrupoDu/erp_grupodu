export interface IOrderItemsDetails {
  order_item_uuid: string;
  product_uuid: string;
  order_uuid: string;
  unit_price: number;
  quantity: number;
}

/**
 * @extends {IOrderItemsDetails}
 * @see {IOrderItemsDetails}
 * @Omit order_item_id
 */
export interface IOrderItemsCreate extends Omit<
  IOrderItemsDetails,
  "order_item_uuid"
> {}

/**
 * @see {IOrderItemsDetails}
 * @extends {IOrderItemsDetails}
 * @Omit unit_price, quantity
 */
export interface IOrderItemsTestType extends Omit<
  IOrderItemsDetails,
  "unit_price" | "quantity"
> {
  unit_price: number;
  quantity: number;
}
