import type AnualAnalysisService from "../services/anualAnalysis.service.js";
import type { Request, Response } from "express";
import type { IAnualAnalysis } from "../types/anualAnalysis.interface.js";
import errorResponseWith from "../utils/errorResponseWith.js";
import successResponseWith from "../utils/successResponseWith.js";

class AnualAnalysisController {
  private anualAnalysisService: AnualAnalysisService;

  constructor(anualAnalysisService: AnualAnalysisService) {
    this.anualAnalysisService = anualAnalysisService;
  }

  async getAllAnualAnalysisService(req: Request, res: Response) {
    try {
      const anualAnalysisData: IAnualAnalysis[] =
        await this.anualAnalysisService.getMontlyAnalysis();

      return res
        .status(200)
        .json(
          successResponseWith(
            anualAnalysisData,
            "Dados encontrados com sucesso.",
          ),
        );
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }

  async updateDeliveredAnualAnalysis(req: Request, res: Response) {
    try {
      const anualAnalysisUpdateResponse: string =
        await this.anualAnalysisService.updateDeliveredMontlyAnalysis();

      return res
        .status(200)
        .json(
          successResponseWith(
            anualAnalysisUpdateResponse,
            "Análise anual atualizada com sucesso.",
          ),
        );
    } catch (err) {
      const error = err as Error;
      return res.status(500).json(errorResponseWith(error.message, 500));
    }
  }
}

export default AnualAnalysisController;
