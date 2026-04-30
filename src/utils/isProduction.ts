export const isProduction = () => {
  const env = process.env["NODE_ENV"] === "production";

  if (!env) process.emitWarning("NODE_ENV não definida ou como dev.\n=> Utilizando banco de testes.")

  return env;
}