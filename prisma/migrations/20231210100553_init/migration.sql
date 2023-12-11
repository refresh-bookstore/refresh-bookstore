/*
  Warnings:

  - You are about to alter the column `name` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `title` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `author` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `publisher` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `isbn` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(13)`.
  - You are about to alter the column `description` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(3000)`.
  - You are about to alter the column `imagePath` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `postalCode` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `address` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `detailAddress` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `phone` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.

*/
-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "categoryId" SET DEFAULT uuid_generate_v4(),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(10);

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "productId" SET DEFAULT uuid_generate_v4(),
ALTER COLUMN "title" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "author" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "publisher" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "isbn" SET DATA TYPE VARCHAR(13),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(3000),
ALTER COLUMN "imagePath" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "postalCode" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "address" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "detailAddress" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(20);
