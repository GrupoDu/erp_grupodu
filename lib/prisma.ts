import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";
import { PrismaClient } from "../generated/prisma/client.js";
import { isProduction } from "../src/utils/isProduction.js";

dotenv.config();
const connectionString = isProduction() ? process.env["DATABASE_URL"] : process.env["DATABASE_DEV_URL"];

const adapter = new PrismaPg({ connectionString });
export const prisma = new PrismaClient({ adapter });

export interface PrismaTransactionClient extends Omit<
  PrismaClient,
  "$connect" | "$disconnect" | "$on" | "$use" | "$extends"
> {}
