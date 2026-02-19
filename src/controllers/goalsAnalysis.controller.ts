import type { Request, Response } from "express";
import { responseMessages } from "../constants/messages.constants.ts";
import type GoalsAnalysisService from "../services/goalsAnalysis.service.ts";

class GoalsAnalysisController {
  constructor(private goalsAnalysisService: GoalsAnalysisService) {}

  async getGoalsAnalysis(req: Request, res: Response) {
    try {
      const goalsAnalysis = await this.goalsAnalysisService.getGoalsAnalysis();

      if (!goalsAnalysis) throw new Error("Nenhuma meta encontrada.");

      return res.status(200).json(goalsAnalysis);
    } catch (err) {
      return res.status(500).json({
        message: responseMessages.catchErrorMessage,
        error: (err as Error).message,
      });
    }
  }
}

export default GoalsAnalysisController;
