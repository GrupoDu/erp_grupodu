import type StockUpdatesService from "../services/stockUpdates.service.js";
import type { Request, Response } from "express";
import errorResponseWith from "../utils/errorResponseWith.js";
import successResponseWith from "../utils/successResponseWith.js";
import checkMissingFields from "../utils/checkMissingFields.js";
import { StockUpdateRegisterSchema } from "../schemas/stockUpdate.schema.js";

/**
 * Controller responsável por gerenciar as operações relacionadas às atualizações de estoque.
 * @see StockUpdatesService
 * @method getStockUpdates
 * @method registerStockUpdate
 */
class StockUpdatesController {
  private _stockUpdatesService: StockUpdatesService;

  constructor(stockUpdatesService: StockUpdatesService) {
    this._stockUpdatesService = stockUpdatesService;
  }

  async getStockUpdates(req: Request, res: Response): Promise<Response> {
    try {
      const stockUpdates = await this._stockUpdatesService.getStockUpdates();
      return res
        .status(200)
        .json(
          successResponseWith(
            stockUpdates,
            "Atualizações de estoque encontradas com sucesso.",
          ),
        );
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }

  async registerStockUpdate(req: Request, res: Response): Promise<Response> {
    const { product_quantity_title, event } = req.body as {
      product_quantity_title: string;
      event: string;
    };
    const stockData = { product_quantity_title, event };

    try {
      const { isMissingFields, requiredFieldsMessage, schemaErr } =
        checkMissingFields(stockData, StockUpdateRegisterSchema);

      if (isMissingFields) {
        return res
          .status(422)
          .json(errorResponseWith(schemaErr, 422, requiredFieldsMessage));
      }

      const stockUpdate = await this._stockUpdatesService.registerStockUpdate(
        product_quantity_title,
        event,
      );

      return res
        .status(201)
        .json(
          successResponseWith(
            stockUpdate,
            "Atualização de estoque registrado.",
            201,
          ),
        );
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }
}

export default StockUpdatesController;
