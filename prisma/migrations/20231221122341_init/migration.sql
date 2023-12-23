/*
  Warnings:

  - Added the required column `address` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressDetail` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientContact` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientName` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "addressDetail" TEXT NOT NULL,
ADD COLUMN     "deliveryRequest" TEXT,
ADD COLUMN     "postalCode" TEXT NOT NULL,
ADD COLUMN     "recipientContact" TEXT NOT NULL,
ADD COLUMN     "recipientName" TEXT NOT NULL;
