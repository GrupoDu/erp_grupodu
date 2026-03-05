import { Api } from "./Api.js";

// Exporta a API já configurada
export const api = new Api({
  baseUrl: "https://gcp-backend-gnxf.onrender.com",
});

// Exporta os tipos também
export * from "./Api.js";
