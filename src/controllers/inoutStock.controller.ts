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
 *
 * @class InOutStockController
 * @see InOutStockService
 */
class InOutStockController {
  private _inoutStockService: InOutStockService;

  /** @param {InOutStockService} inoutStockService - Serviço de estoque */
  constructor(inoutStockService: InOutStockService) {
    this._inoutStockService = inoutStockService;
  }

  /**
   * Método responsável por buscar dados de análise de estoque.
   *
   * @returns {Promise<Response>} - Objeto com dados de análise de estoque
   * @param {Request} req - Request express
   * @param {Response} res - Response express
   * @see InOutStockController
   */
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

  /**
   * Método responsável por incrementar a quantidade de estoque.
   *
   * @returns {Promise<Response>} - Objeto com dados de estoque incrementados
   * @param {Request} req - Request express
   * @param {Response} res - Response express
   * @see InOutStockController
   */
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

  /**
   * Método responsável por incrementar a quantidade de estoque que saiu.
   *
   * @returns {Promise<Response>} - Objeto com dados de estoque decrementados
   * @param {Request} req - Request express
   * @param {Response} res - Response express
   * @see InOutStockController
   */
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
