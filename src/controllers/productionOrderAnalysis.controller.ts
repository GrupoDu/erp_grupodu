import type { Request, Response } from "express";
import type RegisterAnalysisService from "../services/productionOrderAnalysis.service.js";
import errorResponseWith from "../utils/errorResponseWith.js";
import successResponseWith from "../utils/successResponseWith.js";

/**
 * Controller responsável por gerenciar a análise de ordem de produção.
 * @see RegisterAnalysisService
 * @method getProductionOrderAnalysis
 */
class ProductionOrderAnalysisController {
  private _registerAnalysisService: RegisterAnalysisService;

  constructor(registerAnalysisService: RegisterAnalysisService) {
    this._registerAnalysisService = registerAnalysisService;
  }

  async getProductionOrderAnalysis(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const registersDataAnalysis =
        await this._registerAnalysisService.registerDataAnalysis();
      const hasNoDeliveredRegister =
        registersDataAnalysis.deliveredRegisterQuantity < 0;
      const hasNoNotDeliveredRegisters =
        registersDataAnalysis.notDeliveredRegisterQuantity < 0;

      if (hasNoDeliveredRegister) {
        return res
          .status(200)
          .json(
            successResponseWith(
              null,
              "Não houve ordem de produção entregues esse mês",
            ),
          );
      }

      if (hasNoNotDeliveredRegisters) {
        return res
          .status(200)
          .json(
            successResponseWith(
              null,
              "Não houve ordem de produção não entregues esse mês",
            ),
          );
      }

      return res
        .status(200)
        .json(
          successResponseWith(
            registersDataAnalysis,
            "Análise de ordem de produção encontrada com sucesso.",
          ),
        );
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }
}

export default ProductionOrderAnalysisController;
