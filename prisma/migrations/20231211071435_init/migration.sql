/*
  Warnings:

  - You are about to drop the column `productId` on the `Product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Product_productId_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "productId";
