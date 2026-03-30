import type InOutStockService from "../services/inoutStock.service.js";
import type { Request, Response } from "express";
import errorResponseWith from "../utils/errorResponseWith.js";
import successResponseWith from "../utils/successResponseWith.js";
import {
  REQUIRED_FIELDS_MESSAGE,
  MISSING_FIELDS_MESSAGE,
} from "../constants/messages.constants.js";
import { isNumber } from "class-validator";

/**
 * Controller responsável por gerenciar as operações de estoque.
 * @see InOutStockService
 * @method getInOutStockAnalysis
 * @method incrementMonthlyInStockQuantity
 * @method incrementMonthlyOutStockQuantity
 */
class InOutStockController {
  private _inoutStockService: InOutStockService;

  constructor(inoutStockService: InOutStockService) {
    this._inoutStockService = inoutStockService;
  }

  async getInOutStockAnalysis(req: Request, res: Response): Promise<Response> {
    try {
      const inOutStockAnalysis =
        await this._inoutStockService.getInOutStockAnalysis();

      return res
        .status(200)
        .json(
          successResponseWith(
            inOutStockAnalysis,
            "Análise de estoque encontrada com sucesso.",
          ),
        );
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }

  async incrementMonthlyInStockQuantity(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { quantity } = req.body as { quantity: number };

    try {
      if (!quantity || !isNumber(quantity)) {
        return res
          .status(422)
          .json(
            errorResponseWith(
              REQUIRED_FIELDS_MESSAGE(["quantity"]),
              422,
              MISSING_FIELDS_MESSAGE,
            ),
          );
      }

      await this._inoutStockService.incrementMonthlyInStockQuantity(quantity);

      return res
        .status(200)
        .json(successResponseWith(null, "Estoque incrementado com sucesso."));
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }

  async incrementMonthlyOutStockQuantity(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { quantity } = req.body as { quantity: number };

    try {
      if (!quantity || !isNumber(quantity)) {
        return res
          .status(422)
          .json(
            errorResponseWith(
              REQUIRED_FIELDS_MESSAGE(["quantity"]),
              422,
              MISSING_FIELDS_MESSAGE,
            ),
          );
      }

      await this._inoutStockService.incrementMonthlyOutStockQuantity(quantity);

      return res
        .status(200)
        .json(successResponseWith(null, "Estoque decrementado com sucesso."));
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }
}

export default InOutStockController;
