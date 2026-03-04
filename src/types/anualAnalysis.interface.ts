import type { Decimal } from "@prisma/client/runtime/wasm-compiler-edge";

export interface IAnualAnalysis {
  id: string;
  month: Decimal;
  year: Decimal;
  delivered: Decimal;
  not_delivered: Decimal;
}
