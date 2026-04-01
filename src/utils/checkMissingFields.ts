import debbugLogger from "./debugLogger.js";
import { REQUIRED_FIELDS_MESSAGE } from "../constants/messages.constants.js";
import extractRequiredFields from "./extractRequiredFields.js";
import type { ZodObject } from "zod";

/**
 * Verifica se há campos obrigatórios faltando.
 * Recebe o objeto e verifica se há campos null || undefined.
 * @param entries
 * @param requiredFields
 * @returns {IEntriesMissingFields} Objeto com as entradas e se há campos faltando.
 */
const hasNullEntries = (
  entries: Record<string, unknown>,
  requiredFields: string[],
): IEntriesMissingFields => {
  const nullEntries = requiredFields.filter(
    (field) => entries[field] === null || entries[field] === undefined,
  );

  return {
    entries: nullEntries,
    isMissing: nullEntries.length > 0,
  };
};

/**
 * Verifica se há campos obrigatórios faltando.
 * Recebe o objeto e verifica se há campos null || undefined.
 * @param entries
 * @param requiredFields
 * @returns Objeto com as chaves e se há campos faltando.
 * @see IKeysMissingFields
 */
const hasEmptyKeys = (
  entries: Record<string, unknown>,
  requiredFields: string[],
): IKeysMissingFields => {
  const nullKeys = requiredFields.filter(
    (field) =>
      entries[field] === null ||
      entries[field] === undefined ||
      entries[field] === "",
  );

  return {
    keys: nullKeys,
    isMissing: nullKeys.length > 0,
  };
};

/**
 * Verifica se há campos obrigatórios faltando.
 * Recebe o objeto e verifica se há campos null || undefined.
 * @param entries
 * @param fields
 * @returns true se há campos faltando, false caso contrário.
 */
const hasMissingRequiredFields = (
  entries: Record<string, unknown>,
  fields: string[],
): boolean => {
  const isMandatoryKeysMissing = fields.some((field) => !entries[field]);
  const fieldsMatch = fields.filter((field) => entries[field]);

  debbugLogger(
    [
      `Verificando os campos: ${JSON.stringify(fieldsMatch)}`,
      `Checagem: ${isMandatoryKeysMissing}`,
    ],
    "hasMissingRequiredFields",
  );

  if (isMandatoryKeysMissing) {
    debbugLogger([
      "Campos obrigatórios faltando.",
      `Campos obrigatórios: ${JSON.stringify(fields)}`,
    ]);
    return true;
  }

  debbugLogger(
    ["Campos obrigatórios analisados.", "Nenhum campo faltando."],
    "hasMissingRequiredFields",
  );
  return false;
};

/**
 * Verifica se há campos obrigatórios faltando ou objeto é vazio.
 * @param entries
 * @param schema
 * @returns Objeto com o resultado da verificação.
 * @see IMissingFields
 * @see ZodObject
 */
export default function checkMissingFields(
  entries: Record<string, unknown>,
  schema: ZodObject,
): IMissingFields {
  const isEntryEmpty = Object.entries(entries).length === 0;
  const requiredFields = extractRequiredFields(schema);
  const missingCheckResult: IMissingFields = {
    schemaErr: "",
    isMissingFields: true,
    requiredFieldsMessage: REQUIRED_FIELDS_MESSAGE(requiredFields),
  };
  const parseSchema = schema.safeParse(entries);
  if (isEntryEmpty) {
    debbugLogger(["Objeto vazio."]);
    return missingCheckResult;
  }

  if (hasMissingRequiredFields(entries, requiredFields))
    return {
      ...missingCheckResult,
      schemaErr: parseSchema.error?.message || "Campo obrigatórios faltando.",
    };

  const entriesFields = hasNullEntries(entries, requiredFields);
  const keysValues = hasEmptyKeys(entries, requiredFields);

  debbugLogger(
    [
      `entriesMissingFields: ${JSON.stringify(entriesFields.entries)}`,
      `keysMissing: ${JSON.stringify(keysValues.keys)}`,
      `isEntryEmpty: ${isEntryEmpty}`,
    ],
    "checkMissingFields",
  );

  return {
    ...missingCheckResult,
    schemaErr:
      parseSchema.error?.message || "Erro de checagem. Campos faltando",
    isMissingFields: entriesFields.isMissing || keysValues.isMissing,
  };
}

interface IMissingFields {
  schemaErr: string;
  isMissingFields: boolean;
  requiredFieldsMessage: string;
}

interface IValidate {
  isMissing: boolean;
}

/**
 * @see IValidate
 */
interface IEntriesMissingFields extends IValidate {
  entries: string[];
}

/**
 * @see IValidate
 */
interface IKeysMissingFields extends IValidate {
  keys: string[];
}
