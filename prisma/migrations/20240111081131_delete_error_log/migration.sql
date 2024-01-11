/*
  Warnings:

  - You are about to drop the `ErrorLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "citext" WITH SCHEMA "public";

-- DropTable
DROP TABLE "ErrorLog";
