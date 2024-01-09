/*
  Warnings:

  - You are about to alter the column `message` on the `ErrorLog` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.
  - You are about to alter the column `type` on the `ErrorLog` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `stackTrace` on the `ErrorLog` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(3000)`.

*/
-- AlterTable
ALTER TABLE "ErrorLog" ALTER COLUMN "message" SET DATA TYPE VARCHAR(1000),
ALTER COLUMN "type" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "stackTrace" SET DATA TYPE VARCHAR(3000);
