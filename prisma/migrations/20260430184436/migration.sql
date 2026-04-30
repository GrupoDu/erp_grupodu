/*
  Warnings:

  - You are about to drop the `anual_analysis` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `unit_price` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "unit_price" INTEGER NOT NULL;

-- DropTable
DROP TABLE "anual_analysis";

-- CreateTable
CREATE TABLE "annual_analysis" (
    "anual_analysis_uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6),
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "delivered" INTEGER NOT NULL DEFAULT 0,
    "not_delivered" INTEGER NOT NULL DEFAULT 0,
    "updated_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "annual_analysis_pkey" PRIMARY KEY ("anual_analysis_uuid")
);
