import type { Request, Response } from "express";
import type GoalsAnalysisService from "../services/goalsAnalysis.service.js";
import errorResponseWith from "../utils/errorResponseWith.js";
import successResponseWith from "../utils/successResponseWith.js";

/**
 * Controller responsável por gerenciar as operações relacionadas à análise de metas.
 * @see GoalsAnalysisService
 * @method getGoalsAnalysis
 */
class GoalsAnalysisController {
  private _goalsAnalysisService: GoalsAnalysisService;

  constructor(goalsAnalysisService: GoalsAnalysisService) {
    this._goalsAnalysisService = goalsAnalysisService;
  }

  async getGoalsAnalysis(req: Request, res: Response) {
    try {
      const goalsAnalysis = await this._goalsAnalysisService.getGoalsAnalysis();

      return res
        .status(200)
        .json(
          successResponseWith(
            goalsAnalysis,
            "Análise de metas encontrada com sucesso.",
          ),
        );
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }
}

export default GoalsAnalysisController;
