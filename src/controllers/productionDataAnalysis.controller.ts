import type { Request, Response } from "express";
import { responseMessages } from "../constants/messages.constants.js";
import { prisma } from "../../lib/prisma.js";
import type { IRegister } from "../types/models.interface.js";

class ProductionDataAnalysisController {
  private today = new Date();

  async productionAnalysisByMonth(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const actualMonth = new Date(
        this.today.getFullYear(),
        this.today.getMonth(),
        1
      );
      const beginningNextMonth = new Date(
        this.today.getFullYear(),
        this.today.getMonth() + 1,
        1
      );
      const allRegistersThisMonth: IRegister[] = await prisma.register.findMany(
        {
          where: {
            created_at: {
              gte: actualMonth,
              lt: beginningNextMonth,
            },
          },
        }
      );

      if (!allRegistersThisMonth) {
        return res.status(400).json({
          message: "Não foi possível encontrar registros no período solicitado",
        });
      }

      const allDeliveredRegisterThisMonth: IRegister[] =
        allRegistersThisMonth.filter(
          (register) => register.status === "Entregue"
        );

      const allPendingRegisterThisMonth: IRegister[] =
        allRegistersThisMonth.filter(
          (register) => register.status === "Pendente"
        );

      const allNotDeliveredRegisterThisMonth: IRegister[] =
        allRegistersThisMonth.filter(
          (register) => register.status === "Não entregue"
        );

      return res.status(200).json({
        delivered: allDeliveredRegisterThisMonth,
        pending: allPendingRegisterThisMonth,
        not_delivered: allNotDeliveredRegisterThisMonth,
      });
    } catch (err) {
      return res.status(500).json({
        message: responseMessages.catchErrorMessage,
        error: (err as Error).message,
      });
    }
  }

  async productionAnalysisByWeek(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const actualWeek = new Date(
        this.today.getFullYear(),
        this.today.getMonth(),
        1
      );
      const beginningNextWeek = new Date(
        this.today.getFullYear(),
        this.today.getMonth() + 1,
        1
      );

      const allRegistersThisWeek: IRegister[] = await prisma.register.findMany({
        where: {
          created_at: {
            gte: actualWeek,
            lt: beginningNextWeek,
          },
        },
      });

      if (!allRegistersThisWeek) {
        return res.status(400).json({
          message: "Não foi possível encontrar registros no período solicitado",
        });
      }

      const allDeliveredRegistersThisWeek: IRegister[] =
        allRegistersThisWeek.filter(
          (register) => register.status === "Entregue"
        );

      const allPendingRegistersThisWeek: IRegister[] =
        allRegistersThisWeek.filter(
          (register) => register.status === "Pendente"
        );

      const allNotDeliveredRegistersThisWeek: IRegister[] =
        allRegistersThisWeek.filter(
          (register) => register.status === "Não entregue"
        );

      return res.status(200).json({
        delivered: allDeliveredRegistersThisWeek,
        pending: allPendingRegistersThisWeek,
        not_delivered: allNotDeliveredRegistersThisWeek,
      });
    } catch (err) {
      return res.status(500).json({
        message: responseMessages.catchErrorMessage,
        error: (err as Error).message,
      });
    }
  }

  async productionAnalysisByYear(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const actualYear = new Date(this.today.getFullYear());
      const firstMonth = `${actualYear}-01-01T00:00:00Z`;
      const lastMonth = `${actualYear}-12-30T00:00:00Z`;

      const allDeliveredRegistersByYear = await prisma.register.findMany({
        where: {
          created_at: {
            gte: firstMonth,
            lt: lastMonth,
          },
        },
      });

      if (!allDeliveredRegistersByYear) {
        return res.status(400).json({
          message: "Não foi possível encontrar registros no período solicitado",
        });
      }

      return res.status(200).json(allDeliveredRegistersByYear);
    } catch (err) {
      return res.status(500).json({
        message: responseMessages.catchErrorMessage,
        error: (err as Error).message,
      });
    }
  }
}

export default ProductionDataAnalysisController;
