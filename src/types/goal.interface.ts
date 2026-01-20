export interface IGoal {
  title: string;
  description: string | null;
  goal_type: string;
  deadline: Date;
  employee_goal?: string | null;
}

export interface IEmployeeGoal extends Omit<IGoal, "employee_goal"> {
  employee_goal: string | null;
}

export interface IGoalResponse extends IGoal {
  goal_id: string;
  created_at: Date;
}
