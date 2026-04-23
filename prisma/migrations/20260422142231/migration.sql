/*
  Warnings:

  - You are about to drop the column `employee_type` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `user_type` on the `users` table. All the data in the column will be lost.
  - Added the required column `employee_role` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employees" DROP COLUMN "employee_type",
ADD COLUMN     "employee_role" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "user_type",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "user_role" TEXT NOT NULL;
