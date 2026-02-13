import type { PrismaClient } from "../../generated/prisma/client.js";
import type { IGoal } from "../types/goal.interface.js";
import { getTodayDate } from "../utils/getTodayDate.js";

class GoalsAnalysisService {
  constructor(private prisma: PrismaClient) {}

  async getGoalsAnalysis() {
    const allGoals: IGoal[] = await this.prisma.goals.findMany({
      where: {
        goal_deadline: {
          gte: new Date(
            getTodayDate().getFullYear(),
            getTodayDate().getMonth(),
            1,
          ),
          lt: new Date(
            getTodayDate().getFullYear(),
            getTodayDate().getMonth() + 1,
            1,
          ),
        },
      },
    });

    if (!allGoals) throw new Error("Nenhuma meta encontrada.");

    const allPendingGoals: IGoal[] = allGoals.filter(
      (goal) => goal.goal_status === "Pendente",
    );

    const allBeatenGoals: IGoal[] = allGoals.filter(
      (goal) => goal.goal_status === "Batida",
    );

    return { allPendingGoals, allBeatenGoals };
  }
}

export default GoalsAnalysisService;
