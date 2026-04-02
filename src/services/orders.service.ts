import type { PrismaClient } from "../../generated/prisma/client.js";
import type {
  IOrder,
  IOrderCreate,
  IOrderUpdate,
} from "../types/orders.interface.js";
import type { IProductionOrderCreate } from "../types/productionOrder.interface.js";
import type { PrismaTransactionClient } from "../../lib/prisma.js";

/**
 * Service responsável por gerenciar pedidos.
 * @see OrdersController
 * @method getOrders
 * @method getOrderById
 * @method createOrder
 * @method updateOrder
 * @method updateOrderStatus
 */
export default class OrdersService {
  private _prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this._prisma = prisma;
  }

  async getOrders() {
    return this._prisma.orders.findMany({
      orderBy: {
        order_status: "asc",
      },
    });
  }

  async getOrderById(order_id: string): Promise<IOrder> {
    const targetOrder: IOrder | null = await this._prisma.orders.findUnique({
      where: { order_id },
    });

    if (!targetOrder) throw new Error("Pedido não encontrado");

    return targetOrder;
  }

  async createOrder(order: IOrderCreate) {
    return this._prisma.orders.create({
      data: {
        ...order,
        order_status: "Ainda não confirmado",
      },
    });
  }

  async updateOrder(
    order_id: string,
    orderUpdatedFields: IOrderUpdate,
  ): Promise<IOrder> {
    const updateData: IOrderUpdate = Object.fromEntries(
      Object.entries(orderUpdatedFields).filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, value]) => value !== undefined,
      ),
    );

    if (Object.keys(updateData).length === 0)
      return this.getOrderById(order_id);

    return this._prisma.orders.update({
      where: { order_id },
      data: updateData,
    });
  }

  async updateOrderStatus(
    order_id: string,
    status: string,
    productionOrders: IProductionOrderCreate[],
  ): Promise<IOrder> {
    const currentOrder: IOrder = await this.getOrderById(order_id);
    if (!currentOrder) throw new Error("Pedido não encontrado");

    enum statusTypes {
      notConfirmed = "Ainda não confirmado",
      inProduction = "Em produção",
      available = "Disponível",
      sent = "Enviado",
      produced = "Produzido",
      finished = "Finalizado",
    }

    const isStatusValid: boolean = Object.values(statusTypes).includes(
      status as statusTypes,
    );

    if (!isStatusValid) throw new Error("Invalid status");

    if (status === "Em produção")
      return this.sendOrderToProduction(order_id, status, productionOrders);

    return this._prisma.orders.update({
      where: { order_id },
      data: { order_status: status },
    });
  }

  private async sendOrderToProduction(
    order_id: string,
    status: string,
    productionOrders: IProductionOrderCreate[],
  ) {
    return this._prisma.$transaction(async (tx) => {
      const updatedOrder = await tx.orders.update({
        where: { order_id },
        data: { order_status: status },
      });

      await Promise.all(
        productionOrders.map((order) =>
          this.createProductionOrder(order_id, order, tx),
        ),
      );

      return updatedOrder;
    });
  }

  private async createProductionOrder(
    order_id: string,
    productionOrderValues: IProductionOrderCreate,
    tx: PrismaTransactionClient,
  ) {
    await tx.production_order.create({
      data: {
        ...productionOrderValues,
        order_id,
      },
    });
  }
}
