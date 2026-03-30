import type { PrismaClient } from "../../generated/prisma/client.js";
import type { IAnualAnalysis } from "../types/anualAnalysis.interface.js";

/**
 * Service responsável por gerenciar análises anuais.
 * @see AnualAnalysisController
 * @method getMontlyAnalysis
 * @method updateDeliveredMontlyAnalysis
 */
class AnualAnalysisService {
  private _prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this._prisma = prisma;
  }

  async getMontlyAnalysis() {
    const montlyAnalysisDate: IAnualAnalysis[] =
      await this._prisma.anualAnalysis.findMany();

    return montlyAnalysisDate;
  }

  async updateDeliveredMontlyAnalysis() {
    const MONTH = new Date().getMonth() + 1;
    const YEAR = new Date().getFullYear();

    const updatedAnalysis = await this._prisma.anualAnalysis.updateMany({
      where: {
        month: MONTH,
        year: YEAR,
      },
      data: {
        delivered: { increment: 1 },
      },
    });

    if (updatedAnalysis.count < 1)
      throw new Error("Nenhuma analise encontrada.");

    return "Analise mensal atualizada com sucesso.";
  }
}

export default AnualAnalysisService;
