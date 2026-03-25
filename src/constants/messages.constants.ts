export const responseMessages = {
  catchErrorMessage: "Houve um erro de conexão",
  fillAllFieldMessage: "Por favor, preencha os campos obrigatórios.",
};

/**
 * Retorna uma string com aviso de campos obrigatórios.
 */
export const MISSING_FIELDS_MESSAGE =
  "Por favor, preencha todos os campos obrigatórios.";

/**
 * Retorna uma string com os campos obrigatórios.
 * @param fields
 */
export const ARBITRARY_FIELDS_MESSAGE = (fields: string[]): string =>
  `Campos obrigatórios: ${fields.join(", ")}`;
