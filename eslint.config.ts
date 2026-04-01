// @ts-check

import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js, "@typescript-eslint": tseslint.plugin },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  tseslint.configs.recommendedTypeChecked,
  {
    rules: {
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unnecessary-type-arguments": "error",
    },
  },
  {
    ignores: ["node_modules", "build", "dist", "**/__tests__/**.*.test.ts"],
  },
]);
