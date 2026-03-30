import type { PrismaClient } from "../../generated/prisma/client.js";
import type { IStockUpdates } from "../types/stockUpdates.interface.js";
import { io } from "../server.js";

/**
 * Service responsável por gerenciar atualizações de estoque.
 * @see StockUpdatesController
 * @method getStockUpdates
 * @method registerStockUpdate
 */
class StockUpdatesService {
  private _prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this._prisma = prisma;
  }

  async getStockUpdates() {
    const stockUpdates = await this._prisma.stock_updates.findMany({
      take: 10,
      orderBy: { created_at: "desc" },
    });
    return stockUpdates;
  }

  async registerStockUpdate(product_quantity_title: string, event: string) {
    const stockUpdate: IStockUpdates = await this._prisma.stock_updates.create({
      data: {
        product_quantity_title,
        event,
        date: new Date(),
      },
    });

    io.emit("stockUpdate", stockUpdate);

    return stockUpdate;
  }
}

export default StockUpdatesService;
