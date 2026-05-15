/* eslint-disable */
import { ZodObject, ZodOptional, ZodDefault } from "zod";

/**
 * Extrai os campos obrigatórios de um schema Zod.
 * @param schema
 * @see ZodObject
 * @returns Array de strings com os nomes dos campos obrigatórios.
 */
export default function extractRequiredFields(
  schema: ZodObject<any>,
): string[] {
  const shape = schema.shape;

  return Object.entries(shape)
    .filter(
      ([_, value]) =>
        !(value instanceof ZodOptional) && !(value instanceof ZodDefault),
    )
    .map(([key, _]) => key);
}
