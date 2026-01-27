import dotenv from "dotenv";
import { defineConfig } from "vitest/config";
dotenv.config({ path: ".env" });

export default defineConfig({
  root: ".",
  test: {
    include: ["**/__tests__/*.test.ts/"],
    environment: "node",
    setupFiles: ["dotenv/config"],
  },
});
