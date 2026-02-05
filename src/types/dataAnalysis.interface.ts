export interface IProductionAnalysis {
  deliveredRegisterQuantity: number;
  notDeliveredRegisterQuantity: number;
  pendingRegisterQuantity: number;
  actualMonth: Date;
  nextMonth: Date;
}

export interface IProductProductionAnalysis extends IProductionAnalysis {
  productName: string;
}

export interface IEmployeeProductionAnalysis extends Omit<
  IProductionAnalysis,
  "pendingRegisterQuantity"
> {
  employeeName: string;
}
