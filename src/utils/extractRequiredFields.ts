/* eslint-disable */
import type { ZodObject } from "zod";

/**
 * Extrai os campos obrigatórios de um schema Zod.
 * @param schema
 * @see ZodObject
 * @returns Array de strings com os nomes dos campos obrigatórios.
 */
export default function extractRequiredFields(schema: ZodObject): string[] {
  const shape = schema.shape;

  return Object.entries(shape)
    .filter(([_, value]) => value._def.type !== "optional")
    .map(([key, _]) => key);
}
