import type { Request, Response } from "express";
import type ProductionOrderAnalysisService from "../services/productionOrderAnalysis.service.js";
import errorResponseWith from "../utils/errorResponseWith.js";
import successResponseWith from "../utils/successResponseWith.js";

/**
 * Controller responsável por gerenciar a análise de ordem de produção.
 *
 * @class ProductionOrderAnalysisController
 * @see RegisterAnalysisService
 */
class ProductionOrderAnalysisController {
  private _productionOrderAnalysisService: ProductionOrderAnalysisService;

  /** @param {ProductionOrderAnalysisService} productionOrderAnalysisService - Instância do serviço de análise de registro */
  constructor(productionOrderAnalysisService: ProductionOrderAnalysisService) {
    this._productionOrderAnalysisService = productionOrderAnalysisService;
  }

  /**
   * Método responsável por buscar análise de ordem de produção.
   *
   * @returns {Promise<Response>} - Objeto com análise de ordem de produção
   * @param {Request} req - Request express
   * @param {Response} res - Response express
   * @see {ProductionOrderAnalysisController}
   */
  async getProductionOrderAnalysis(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const productionOrderDataAnalysis =
        await this._productionOrderAnalysisService.productionOrderDataAnalysis();

      return res
        .status(200)
        .json(
          successResponseWith(
            productionOrderDataAnalysis,
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
