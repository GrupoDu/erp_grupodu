import { isString } from "class-validator";

export const hasValidString = (value: unknown): value is string =>
  !!value && isString(value);
